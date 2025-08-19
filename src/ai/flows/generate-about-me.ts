'use server';

/**
 * @fileOverview AI-powered 'About Me' generator.
 *
 * - generateAboutMe - A function that generates an 'About Me' block in a specified style.
 * - GenerateAboutMeInput - The input type for the generateAboutMe function.
 * - GenerateAboutMeOutput - The return type for the generateAboutMe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAboutMeInputSchema = z.object({
  style: z
    .string()
    .describe('The style of the About Me block to generate (e.g., professional, casual, creative).'),
  userDetails: z.string().describe('Details about the user to be included in the About Me block.'),
});
export type GenerateAboutMeInput = z.infer<typeof GenerateAboutMeInputSchema>;

const GenerateAboutMeOutputSchema = z.object({
  aboutMe: z.string().describe('The generated About Me block in the specified style.'),
});
export type GenerateAboutMeOutput = z.infer<typeof GenerateAboutMeOutputSchema>;

export async function generateAboutMe(input: GenerateAboutMeInput): Promise<GenerateAboutMeOutput> {
  return generateAboutMeFlow(input);
}

const generateAboutMePrompt = ai.definePrompt({
  name: 'generateAboutMePrompt',
  input: {schema: GenerateAboutMeInputSchema},
  output: {schema: GenerateAboutMeOutputSchema},
  prompt: `You are an AI assistant specializing in generating "About Me" blocks.

  Generate an "About Me" block in the following style: {{{style}}}.
  The "About Me" block should be based on the following user details: {{{userDetails}}}.
  The generated "About Me" block should be concise and engaging.
  Do not include any introductory or concluding sentences, only the "About Me" block.
  Example of a creative about me block: A curious mind with a passion for crafting innovative solutions. Shibam loves to blend technical skills with creative problem-solving, always eager to explore new possibilities in the tech landscape.
  
  You must provide your response as a valid JSON object, adhering to the specified output schema.
  `,
});

const generateAboutMeFlow = ai.defineFlow(
  {
    name: 'generateAboutMeFlow',
    inputSchema: GenerateAboutMeInputSchema,
    outputSchema: GenerateAboutMeOutputSchema,
  },
  async input => {
    const {output} = await generateAboutMePrompt(input);
    if (!output) {
      throw new Error('Failed to generate about me content.');
    }
    return output;
  }
);
