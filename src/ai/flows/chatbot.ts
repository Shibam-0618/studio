
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
  return chatbotFlow(input);
}

const portfolioContext = `
Shibam Das is an Information Technology student with a passion for building innovative software solutions and exploring the frontiers of artificial intelligence.

Skills:
- Programming Languages: JavaScript, Python, Java, C++, SQL
- Web Technologies: React, Node.js, HTML, CSS
- Libraries/Frameworks: Pandas, NumPy
- Cloud Platforms: Amazon Web Services (AWS), Google Cloud Platform (GCP), Firebase
- Databases: MySQL, PostgreSQL, MongoDB
- Version Control: Git, GitHub

Experience:
- AWS Cloud Intern at Elewayte (Feb 2025 - Mar 2025): Designed ETL pipelines, worked with AWS Glue, built data catalogs, developed ETL jobs with Apache Spark (Python), and configured workflow automation.

Projects:
- AWS Glue – Automated ETL Pipeline: Built a fully automated ETL pipeline on AWS.
- AI/ML Candlestick Analysis System: Developed a machine learning model to analyze and predict stock market trends.
- Fraud Detection in Online Transactions: Built a machine learning system to detect fraudulent online transactions in real-time.

Education:
- Bachelor of Technology in Information Technology from MCKV institute of engineering.

Contact:
- Email: shibamdas0618@gmail.com
- Phone: 8240169466
- GitHub: https://github.com/shibam-das
- LinkedIn: https://www.linkedin.com/in/shibam-das-8262092a7
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
  prompt: `You are Shibam’s Website Assistant, an AI chatbot designed to help visitors on www.shibamdas.com.

Your role is to:
- Welcome visitors in a friendly, professional manner.
- Answer questions about Shibam Das, his portfolio, skills, projects, and experience.
- Provide clear guidance about how to navigate the website.
- Offer information about contact methods (email, phone, LinkedIn, GitHub).
- If visitors ask for career details, internships, or collaboration, give concise answers and suggest contacting Shibam directly.
- Always stay polite, conversational, and helpful.
- Use short paragraphs or bullet points for clarity.
- Simulate a natural chat flow, like a real assistant, not a robotic Q&A.
- If you don’t know the answer, politely guide the user to contact Shibam via email at shibamdas0618@gmail.com.

**Special Commands**:
- If the user asks for 'help', provide a list of things you can do.
- If the user says 'reset', confirm that the conversation history will be cleared.
- If the user says their name (e.g., "my name is..."), remember it and use it in your responses.

**Context about Shibam Das**:
${portfolioContext}

**Conversation History**:
{{#each history}}
  {{role}}: {{{content}}}
{{/each}}
user: {{{message}}}

You must use your tools to answer any questions about the current time or date.

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
    const { history, message } = input;

    // The first message from the user.
    if (!history || history.length === 0) {
      const llmResponse = await chatbotPrompt({
        history: [],
        message: 'Hello',
      });
      const output = llmResponse.output();
      if (!output) {
        throw new Error('Failed to get a response from the chatbot.');
      }
      return output;
    }

    const llmResponse = await chatbotPrompt({
      history: history,
      message: message,
    });
    const output = llmResponse.output();
    if (!output) {
      throw new Error('Failed to get a response from the chatbot.');
    }
    return output;
  }
);
