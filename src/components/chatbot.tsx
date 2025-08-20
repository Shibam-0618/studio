
'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { handleChatbot } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Send, X, Loader2, Bot, User, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

type Message = {
  role: 'user' | 'model';
  content: string;
};

const quickPrompts = [
  "hi",
  "what's the time?",
  "help",
  "my name is Shibam",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);
  
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      setTimeout(() => scrollAreaRef.current!.scrollTop = scrollAreaRef.current!.scrollHeight, 0);
    }
  };

  const resetChat = () => {
    setMessages([]);
    const modelMessage: Message = { role: 'model', content: "Memory cleared. Let's start over!" };
    setMessages((prev) => [...prev, modelMessage]);
  }
  
  const sendPrompt = (prompt: string) => {
    const userMessage: Message = { role: 'user', content: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    
    startTransition(async () => {
      try {
        const result = await handleChatbot({
          history: messages,
          message: prompt,
        });
        const modelMessage: Message = { role: 'model', content: result.response };
        setMessages((prev) => [...prev, modelMessage]);
      } catch (error) {
        console.error(error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to get a response. Please try again.',
        });
        setMessages((prev) => prev.slice(0, -1)); // Remove the user message on error
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (input.trim().toLowerCase() === 'reset') {
      resetChat();
      setInput('');
      return;
    }
    sendPrompt(input);
  };

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50">
        <Button size="icon" onClick={() => setIsOpen(!isOpen)} className="rounded-full h-14 w-14" aria-label="Toggle Chatbot">
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>

      {isOpen && (
        <Card className="fixed bottom-24 right-5 z-50 w-full max-w-sm flex flex-col shadow-2xl bg-card/80 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Ask me about Shibam!</CardDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={resetChat} aria-label="Reset chat">
              <RotateCcw className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col p-0">
            <ScrollArea className="h-80 flex-grow">
              <div ref={scrollAreaRef} className="space-y-4 p-6">
                {messages.length === 0 && (
                   <div className="flex items-start gap-3 justify-start">
                     <div className="bg-primary text-primary-foreground rounded-full p-2">
                       <Bot className="h-5 w-5" />
                     </div>
                     <div className="bg-muted/50 rounded-lg px-4 py-2 text-sm">
                       Hello! Ask me about Shibam, or try one of the prompts below.
                     </div>
                  </div>
                )}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-start gap-3',
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.role === 'model' && (
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Bot className="h-5 w-5" />
                      </div>
                    )}
                    <div
                      className={cn(
                        'rounded-lg px-4 py-2 text-sm max-w-[80%]',
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/50'
                      )}
                    >
                      {message.content}
                    </div>
                     {message.role === 'user' && (
                      <div className="bg-secondary text-secondary-foreground rounded-full p-2">
                        <User className="h-5 w-5" />
                      </div>
                    )}
                  </div>
                ))}
                {isPending && (
                   <div className="flex items-start gap-3 justify-start">
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Bot className="h-5 w-5" />
                      </div>
                      <div className="bg-muted/50 rounded-lg px-4 py-2">
                         <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                   </div>
                )}
              </div>
            </ScrollArea>
             {messages.length <= 1 && (
              <div className="p-4 border-t border-white/10 flex flex-wrap gap-2">
                {quickPrompts.map((prompt) => (
                  <Badge 
                    key={prompt}
                    variant="outline"
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => sendPrompt(prompt)}
                  >
                    {prompt}
                  </Badge>
                ))}
              </div>
            )}
            <div className="p-4 border-t border-white/10 bg-background/80">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type 'help' for commands..."
                  disabled={isPending}
                />
                <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
                  {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
