
'use server';
/**
 * @fileOverview A chatbot AI flow that uses tools to answer questions.
 */

import { ai } from '@/ai/genkit';
import { Message, Role } from '@/lib/types';
import { z } from 'zod';

const getCurrentTime = ai.defineTool(
  {
    name: 'getCurrentTime',
    description: 'Get the current time.',
    outputSchema: z.string(),
  },
  async () => {
    return new Date().toLocaleTimeString();
  }
);

const getCurrentDate = ai.defineTool(
  {
    name: 'getCurrentDate',
    description: 'Get the current date.',
    outputSchema: z.string(),
  },
  async () => {
    return new Date().toLocaleDateString();
  }
);

const chatbotPrompt = ai.definePrompt({
  name: 'chatbotPrompt',
  tools: [getCurrentTime, getCurrentDate],
  system: `You are Shibam’s Website Assistant, an AI chatbot designed to help visitors on www.shibamdas.com. 
Your role is to:
- Welcome visitors in a friendly, professional manner.  
- Answer questions about Shibam Das, his portfolio, skills, projects, and experience.  
- Provide clear guidance about how to navigate the website.  
- Offer information about contact methods (email, phone, LinkedIn, GitHub).  
- If visitors ask for career details, internships, or collaboration, give concise answers and suggest contacting Shibam directly.  
- Always stay polite, conversational, and helpful.  
- Use short paragraphs or bullet points for clarity.  
- Simulate a natural chat flow, like a real assistant, not a robotic Q&A.  
- If you don’t know the answer, politely guide the user to the "Contact" section or email.  

If the user asks to reset the conversation, output the simple string "reset".

Tone: Friendly, supportive, professional.  
Goal: Make users feel comfortable exploring the website and learning more about Shibam Das.`,
});

export async function chat(history: Message[]) {
  const llmHistory = history.map((message) => ({
    role: message.role,
    content: [{ text: message.content }],
  }));

  const result = await chatbotPrompt({
    history: llmHistory,
  });

  return result.output?.content as { text: string };
}
