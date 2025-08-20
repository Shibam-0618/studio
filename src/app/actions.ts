
'use server';

import { chat } from "@/ai/flows/chatbot";
import { Message, Role } from "@/lib/types";

export async function continueConversation(history: Message[]) {
  return await chat(history);
}
