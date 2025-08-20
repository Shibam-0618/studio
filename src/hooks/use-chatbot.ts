
'use client';

import { useState, useEffect } from 'react';
import { continueConversation } from '@/app/actions';
import { Message } from '@/lib/types';
import { nanoid } from 'nanoid';

const initialMessage: Message = {
  id: nanoid(),
  role: 'assistant',
  content: "Hi there! I'm Shibam's personal AI assistant. Feel free to ask me anything about his work or skills.",
};

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: nanoid(),
      role: 'user',
      content: input,
    };

    const newHistory = [...messages, userMessage];
    setMessages(newHistory);
    setInput('');
    setIsLoading(true);

    try {
      const result = await continueConversation(newHistory);

      if (result.text.trim().toLowerCase() === 'reset') {
        reset();
        return;
      }
      
      const assistantMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: result.text,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error continuing conversation:', error);
       const errorMessage: Message = {
        id: nanoid(),
        role: 'assistant',
        content: 'Sorry, I seem to be having some trouble right now. Please try again later.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
     setMessages([initialMessage]);
  }

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    reset,
  };
}
