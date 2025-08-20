
'use server';

/**
 * @fileOverview An AI chatbot for Shibam Das's portfolio.
 *
 * - askChatbot - A function that handles chatbot conversations.
 * - ChatbotInput - The input type for the askChatbot function.
 * - ChatbotOutput - The return type for the askChatbot function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatHistorySchema = z.array(
  z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })
);

const ChatbotInputSchema = z.object({
  history: ChatHistorySchema,
  message: z.string().describe('The latest message from the user.'),
});
export type ChatbotInput = z.infer<typeof ChatbotInputSchema>;

const ChatbotOutputSchema = z.object({
  response: z.string().describe("The chatbot's response to the user."),
});
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

export async function askChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  // We only need to pass the history and the new message to the flow.
  // The initial welcome message should not be part of the conversation history for the AI.
  const history = input.history.slice(1); 
  return chatbotFlow({ history, message: input.message });
}

const portfolioContext = `
Shibam Das is a B.Tech student in Information Technology at MCKV Institute of Engineering (2024–2028).

Contact:
- Email: shibamdas0618@gmail.com
- Phone: 8240169466
- Portfolio: www.shibamdas.com
- GitHub & LinkedIn: Available upon request.

Skills:
- Programming Languages: Python, C++, Java
- Libraries/Frameworks: Pandas, NumPy, yfinance, Node.js, React
- Cloud Platforms: AWS, GitHub Actions
- Databases: MongoDB, SQL
- Version Control: Git, GitHub

Experience:
- AWS Cloud Intern at Elewayte (Feb 2025 - Mar 2025):
  - Built ETL pipelines for structured & semi-structured datasets.
  - Worked with AWS Glue, Data Catalogs, Crawlers, and Apache Spark (Python).
  - Automated workflows using Triggers and tested scripts in Development Endpoints.

Projects:
1. AWS Glue – Automated ETL Pipeline:
   - Built a scalable, serverless ETL solution using AWS Glue, Jobs, Crawlers, and Triggers.
   - Significantly reduced manual effort and improved data integration processes.

2. AI/ML Candlestick Analysis System:
   - Developed a system for live stock candlestick analysis using AI/ML.
   - Tech Stack: Python, Pandas, NumPy, yfinance, React, Node.js, MongoDB, AWS.
   - Result: Delivered real-time data visualization and predictive insights for stock trends.

3. Fraud Detection in Online Transactions:
   - Implemented ML models like Logistic Regression, Random Forest, and XGBoost.
   - Addressed dataset imbalance using the SMOTE technique.
   - Created a REST API with Flask/FastAPI for model deployment.
   - Result: Achieved high-accuracy fraud detection in transactions.
`;

const getCurrentTime = ai.defineTool(
  {
    name: 'getCurrentTime',
    description: 'Gets the current time.',
    outputSchema: z.string(),
  },
  async () => new Date().toLocaleTimeString()
);

const getCurrentDate = ai.defineTool(
  {
    name: 'getCurrentDate',
    description: 'Gets the current date.',
    outputSchema: z.string(),
  },
  async () => new Date().toLocaleDateString()
);

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: { schema: ChatbotInputSchema },
  output: { schema: ChatbotOutputSchema },
  tools: [getCurrentTime, getCurrentDate],
  prompt: `You are Shibam Das’s personal website assistant, built to engage visitors on www.shibamdas.com. 
Your role is to simulate a natural and friendly chatbot experience, helping visitors learn about Shibam’s profile, projects, skills, and career.

Your goal is to help visitors quickly understand who Shibam Das is, what he has achieved, and how they can connect with him.
Always make the interaction feel like chatting with a real assistant, not a robotic FAQ.

### What you should do:
- Greet visitors warmly and professionally.
- Be conversational, friendly, and professional. Use emojis occasionally for a welcoming feel (e.g., 📊, 🚀, 💡).
- Answer questions about Shibam Das, his portfolio, skills, projects, and experience using the context provided below.
- Present answers in clear sections or bullet points for readability.
- Encourage users to explore Shibam’s projects and contact him.
- If you don’t know the answer, politely guide the user to contact Shibam via his email.
- You must use your tools to answer any questions about the current time or date.

### Special Commands:
- If the user asks for 'help', provide a list of things you can do.
- If the user says 'reset', confirm that the conversation history will be cleared.
- If the user says their name (e.g., "my name is..."), remember it and use it in your responses.

### Context about Shibam Das:
${portfolioContext}

### Conversation History:
{{#each history}}
  {{role}}: {{{content}}}
{{/each}}
user: {{{message}}}

You must provide your response as a valid JSON object, adhering to the specified output schema.
`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: ChatbotInputSchema,
    outputSchema: ChatbotOutputSchema,
  },
  async (input) => {
    const { output } = await chatbotPrompt(input);
    if (!output) {
      throw new Error('Failed to get a response from the chatbot.');
    }
    return output;
  }
);
