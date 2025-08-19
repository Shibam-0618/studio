
'use server';

import {
  generateAboutMe,
  type GenerateAboutMeInput,
  type GenerateAboutMeOutput,
} from '@/ai/flows/generate-about-me';
import {
  askChatbot,
  type ChatbotInput,
  type ChatbotOutput,
} from '@/ai/flows/chatbot';

/**
 * Handles the generation of the "About Me" text by calling the AI flow.
 * @param input - The input for the generation, including style and user details.
 * @returns The generated "About Me" text.
 */
export async function handleGenerateAboutMe(
  input: GenerateAboutMeInput
): Promise<GenerateAboutMeOutput> {
  return generateAboutMe(input);
}

/**
 * Handles sending a message to the chatbot and getting a response.
 * @param input - The chatbot input including history and the new message.
 * @returns The chatbot's response.
 */
export async function handleChatbot(input: ChatbotInput): Promise<ChatbotOutput> {
  return askChatbot(input);
}
