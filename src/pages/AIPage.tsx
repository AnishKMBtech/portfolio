import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Bot, User, ArrowLeft, Trash2, Brain, Loader2, RefreshCcw, ThumbsUp, ThumbsDown, Copy, Share } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { PromptInputBox } from "@/components/ui/ai-prompt-box";
import { Conversation, ConversationContent } from "@/components/ui/conversation";
import { Message as ChatMessage, MessageContent } from "@/components/ui/message";
import { Actions, Action } from "@/components/ui/actions";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  reasoning?: string;
  timestamp: Date;
}

export const AIPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setHasStarted(true);

    // Create a placeholder for the assistant message
    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      reasoning: '',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat/nvidia', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: "system", content: "You are an AI assistant integrated into Anish's portfolio. You are helpful, concise, and knowledgeable about Anish's work in AI and Linux. Keep your responses professional yet friendly." },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: messageText }
          ],
          stream: true
        }),
      });

      if (!response.ok) throw new Error('Failed to fetch from NVIDIA NIM');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';
      let fullReasoning = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const dataStr = line.slice(6);
              if (dataStr === '[DONE]') break;

              try {
                const data = JSON.parse(dataStr);
                if (data.reasoning) {
                  fullReasoning += data.reasoning;
                }
                if (data.content) {
                  fullContent += data.content;
                }

                setMessages(prev => prev.map(m => 
                  m.id === assistantMessageId 
                    ? { ...m, content: fullContent, reasoning: fullReasoning } 
                    : m
                ));
              } catch (e) {
                console.error('Error parsing stream chunk:', e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => prev.map(m => 
        m.id === assistantMessageId 
          ? { ...m, content: "I encountered an error. Please check your connection or try again later." } 
          : m
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setHasStarted(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 md:px-6 relative overflow-hidden flex flex-col">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900/40 via-transparent to-transparent pointer-events-none"></div>

      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold text-zinc-100 mb-8 tracking-tight">
                How can I <span className="text-zinc-500">help?</span>
              </h1>
              <p className="text-zinc-400 max-w-xl mb-12 text-lg leading-relaxed">
                Ask me about projects, journey with Arch Linux, or anything related to AI and Machine Learning.
              </p>

              <div className="w-full relative group">
                <PromptInputBox 
                  onSend={(msg) => handleSend(msg)} 
                  isLoading={isLoading}
                  placeholder="Message Anish's AI..."
                  className="bg-zinc-900/50 border-zinc-800 py-4 px-6 rounded-2xl"
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['Tell me about Anish', 'What is Arch Linux?', 'Recent AI projects'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col w-full"
            >
              {/* Minimal Chat Header */}
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={clearChat}
                  className="flex items-center gap-2 text-zinc-500 hover:text-zinc-100 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span className="text-sm font-medium">New Chat</span>
                </button>
              </div>

              {/* Messages Area */}
              <Conversation className="flex-1 chat-scrollbar">
                <ConversationContent className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex w-full",
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div className={cn(
                        "max-w-[85%] md:max-w-[75%] p-4 rounded-2xl",
                        message.role === 'user' 
                          ? 'bg-zinc-800 text-zinc-100 rounded-br-none' 
                          : 'bg-zinc-900/50 text-zinc-300 rounded-bl-none border border-zinc-800'
                      )}>
                        {message.reasoning && (
                          <div className="mb-3 p-3 bg-black/20 rounded-xl border border-white/5">
                            <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2">
                              <Brain size={12} />
                              Thought Process
                            </div>
                            <div className="text-xs text-zinc-500 italic font-serif leading-relaxed">
                              {message.reasoning}
                            </div>
                          </div>
                        )}
                        <div className="markdown-body prose prose-invert prose-sm max-w-none">
                          <ReactMarkdown>{message.content}</ReactMarkdown>
                        </div>
                        <div className="mt-2 text-[10px] font-mono opacity-30">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center gap-2">
                        <Loader2 className="animate-spin text-zinc-500" size={14} />
                        <span className="text-xs text-zinc-500 font-mono italic">Thinking...</span>
                      </div>
                    </motion.div>
                  )}
                </ConversationContent>
              </Conversation>

              {/* Chat Input */}
              <div className="mt-6">
                <PromptInputBox 
                  onSend={(msg) => handleSend(msg)} 
                  isLoading={isLoading}
                  placeholder="Message Anish's AI..."
                  className="bg-zinc-900/50 border-zinc-800 py-3 px-5 rounded-2xl"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
