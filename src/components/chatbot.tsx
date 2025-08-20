
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Bot, User, Loader, RefreshCw, Send } from 'lucide-react';
import { useChatbot } from '@/hooks/use-chatbot';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit, isLoading, reset } =
    useChatbot();

  const quickPrompts = [
    'Hi',
    'Tell me about Shibam',
    "What's the time?",
    'Show me his projects',
  ];

  const handleQuickPrompt = (prompt: string) => {
    const syntheticEvent = {
      target: { value: prompt },
    } as React.ChangeEvent<HTMLInputElement>;
    handleInputChange(syntheticEvent);
    const formEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
     // A bit of a hack to get the form to submit with the new value
    setTimeout(() => {
      handleSubmit(formEvent);
    }, 0);
  };


  return (
    <div>
      <div
        className={cn(
          'fixed bottom-5 right-5 z-50 transition-all duration-300',
          isOpen ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
        )}
      >
        <Button size="icon" onClick={() => setIsOpen(true)}>
          <MessageCircle />
        </Button>
      </div>

      <div
        className={cn(
          'fixed bottom-5 right-5 z-50 transition-all duration-300 w-[calc(100%-2.5rem)] sm:w-96',
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        )}
      >
        <Card className="flex flex-col h-[70vh] bg-card/80 backdrop-blur-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Bot className="h-8 w-8 text-primary" />
              <div>
                <CardTitle>Shibam's Assistant</CardTitle>
                <CardDescription>Your friendly guide</CardDescription>
              </div>
            </div>
            <div className="flex gap-1">
               <Button size="icon" variant="ghost" onClick={reset}>
                 <RefreshCw className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="ghost" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardHeader>

          <ScrollArea className="flex-1 px-4">
             <div className="flex flex-col gap-4 p-4">
              {messages.map((m, i) => (
                <div key={i} className="flex gap-3 items-start">
                  {m.role === 'user' ? (
                    <User className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                  )}
                  <div className="flex-1 bg-background/50 p-3 rounded-lg">
                    <p className="text-sm">{m.content}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 items-start">
                  <Bot className="h-6 w-6 text-primary flex-shrink-0" />
                  <div className="flex-1 bg-background/50 p-3 rounded-lg flex items-center">
                    <Loader className="h-5 w-5 animate-spin" />
                  </div>
                </div>
              )}

              {messages.length === 0 && !isLoading && (
                <div className="text-center text-sm text-muted-foreground p-4">
                  <p className="mb-4">Ask me anything about Shibam!</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickPrompts.map((prompt) => (
                      <Button
                        key={prompt}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickPrompt(prompt)}
                      >
                        {prompt}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask something..."
              />
              <Button size="icon" type="submit" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
