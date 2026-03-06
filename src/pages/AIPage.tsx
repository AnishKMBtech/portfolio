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
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-6 relative overflow-hidden flex flex-col">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[160px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald-500/5 blur-[160px] rounded-full pointer-events-none"></div>

      <div className="w-full px-4 md:px-8 flex-1 flex flex-col relative z-10">
        <AnimatePresence mode="wait">
          {!hasStarted ? (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex-1 flex flex-col items-center justify-center text-center px-4"
            >
              <h1 className="text-6xl md:text-8xl font-display font-bold text-zinc-100 mb-10 tracking-tighter">
                How can I <span className="text-zinc-500">help?</span>
              </h1>
              <p className="text-zinc-500 max-w-2xl mb-20 text-xl leading-relaxed">
                Ask me about projects, journey with Arch Linux, or anything related to AI and Machine Learning.
              </p>

              <div className="w-full max-w-3xl relative group">
                <PromptInputBox 
                  onSend={(msg) => handleSend(msg)} 
                  isLoading={isLoading}
                  placeholder="Ask me anything..."
                />
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {['Tell me about Anish', 'What is Arch Linux?', 'Recent AI projects'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSend(suggestion)}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-zinc-400 hover:bg-white/10 hover:text-zinc-200 transition-all"
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
              className="flex-1 flex flex-col w-full max-w-5xl mx-auto"
            >
              {/* Minimal Chat Header */}
              <div className="flex items-center justify-between mb-10 pb-5 border-b border-white/5">
                <button 
                  onClick={clearChat}
                  className="group flex items-center gap-4 text-zinc-500 hover:text-zinc-100 transition-colors"
                >
                  <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                  <span className="text-sm font-mono uppercase tracking-widest">Back</span>
                </button>
                <button 
                  onClick={clearChat}
                  className="text-zinc-700 hover:text-zinc-400 text-xs font-mono uppercase tracking-widest transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Messages Area */}
              <Conversation className="flex-1 pr-4 chat-scrollbar">
                <ConversationContent className="space-y-8">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <ChatMessage 
                        from={message.role}
                        className={message.role === 'user' ? 'items-end' : 'items-start'}
                      >
                        <div className="flex flex-col gap-2 w-full">
                          {message.reasoning && (
                            <div className="mb-2 p-4 bg-zinc-900/50 rounded-2xl border border-white/5 max-w-full">
                              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 uppercase tracking-widest mb-2">
                                <Brain size={14} className="text-zinc-700" />
                                Thought Process
                              </div>
                              <div className="text-sm text-zinc-500 italic font-serif leading-relaxed">
                                {message.reasoning}
                              </div>
                            </div>
                          )}
                          <MessageContent className={cn(
                            "text-base leading-relaxed w-full",
                            message.role === 'user' 
                              ? 'bg-zinc-800 text-zinc-100 rounded-2xl rounded-tr-none ml-auto w-fit max-w-[80%]' 
                              : 'bg-transparent border-none text-zinc-300 p-0'
                          )}>
                            <div className="markdown-body prose prose-invert prose-base max-w-none">
                              <ReactMarkdown>{message.content}</ReactMarkdown>
                            </div>
                            <div className="mt-2 text-[10px] font-mono opacity-30">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </MessageContent>
                          
                          {message.role === 'assistant' && message.content && (
                            <Actions className="mt-1">
                              <Action tooltip="Retry"><RefreshCcw className="size-4" /></Action>
                              <Action tooltip="Like"><ThumbsUp className="size-4" /></Action>
                              <Action tooltip="Dislike"><ThumbsDown className="size-4" /></Action>
                              <Action tooltip="Copy" onClick={() => navigator.clipboard.writeText(message.content)}><Copy className="size-4" /></Action>
                              <Action tooltip="Share"><Share className="size-4" /></Action>
                            </Actions>
                          )}
                        </div>
                      </ChatMessage>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex"
                    >
                      <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-2 mr-auto">
                        <Loader2 className="animate-spin text-zinc-500" size={14} />
                        <span className="text-xs text-zinc-600 font-mono italic">Thinking...</span>
                      </div>
                    </motion.div>
                  )}
                </ConversationContent>
              </Conversation>

              {/* Chat Input */}
              <div className="mt-10 pt-8 border-t border-white/5">
                <div className="max-w-4xl mx-auto w-full">
                  <PromptInputBox 
                    onSend={(msg) => handleSend(msg)} 
                    isLoading={isLoading}
                    placeholder="Message..."
                    className="bg-zinc-900/50 border-white/10 py-3 px-5"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
