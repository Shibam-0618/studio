
'use server';

import {
  generateAboutMe,
  type GenerateAboutMeInput,
  type GenerateAboutMeOutput,
} from '@/ai/flows/generate-about-me';

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
