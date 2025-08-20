
'use server';

import {
  askChatbot,
  type ChatbotInput,
  type ChatbotOutput,
} from '@/ai/flows/chatbot';

/**
 * Handles sending a message to the chatbot and getting a response.
 * @param input - The chatbot input including history and the new message.
 * @returns The chatbot's response.
 */
export async function handleChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return askChatbot(input);
}
