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

const PORTFOLIO_SYSTEM_PROMPT = `You are Anish's AI Portfolio Assistant, integrated directly into Anish's personal website. Your goal is to represent Anish professionally, sharing details about his background, experience, projects, skills, and writing with visitors. Keep your responses friendly, concise, professional, and directly answered.

Here is the complete knowledge base about Anish and his work:

### ABOUT ANISH
Anish is an AI Engineer and Linux developer with deep expertise in Large Language Models (LLMs) fine-tuning, quantization, on-device mobile AI, cloud security, and open-source tooling. He is a passionate Arch Linux user and builder.

### WORK EXPERIENCE
1. Nokia Research Intern — SRM Centre of Excellence (Nov 2025 - Jan 2026)
   - Cleaned and transformed 3+ hours of machine-generated time series data from Deprag screwing systems across 19-screw SSD assembly cycles for predictive maintenance.
   - Built a live data visualization dashboard tracking torque ranges and screw cycle anomalies.
   - Delivered automated fault detection systems reducing reliance on manual checks.

2. AI & ML Intern (Product and Research) — ISMO Bio-Photonics, IIT Madras Research Park (Aug 2025 - Oct 2025)
   - Expanded an embryology blastocyst grading dataset from 1,500 to 22,000 samples using image augmentation.
   - Developed a hierarchical classification pipeline grading embryos across 54 categories spanning growth days and quality tiers.
   - Fine-tuned computer vision models and VLMs (SigLip, ResNet) and deployed the demo to production via Hugging Face Spaces and Firebase.

### PROJECTS
1. LLM Fine-Tuning & Quantization
   - Description: Fine-tuned Meta's LLaMA 3.2 1B model using ORPO (Odds Ratio Preference Optimization) on a curated 15k preference dataset (orpo-dpo-mix-40k).
   - Implementation: Applied QLoRA/LoRA to keep compute costs low. Quantized the model to GGUF (FP16 2.3 GB down to Q4_K_M 700 MB) via llama.cpp for efficient local CPU inference (70% size reduction).
   - Links: GitHub (AnishKMBtech/LLM-Quantisation-LLAMA3.2), HuggingFace Model (ANISH-j/Quantized-Llama-3.2-1B-15k), Colab Notebook.

2. hflocal — Python Library
   - Description: An open-source Python library published on PyPI that simplifies downloading, saving, and loading Hugging Face models offline with clean developer abstractions (save_model, load_model, ModelPipeline).
   - Links: PyPI (pypi.org/project/hflocal/), GitHub (AnishKMBtech/hflocal). Automated release CI/CD via GitHub Actions.

3. Archon AI — Offline Assistant (Android)
   - Description: A privacy-first Android AI assistant running GGUF LLMs (LLaMA 3, Gemma, Qwen 2.5, DeepSeek) locally on ARM64 hardware via llama.cpp and JNI with zero cloud dependency. Dynamic model switching and real-time streaming built with Jetpack Compose.
   - Links: GitHub (AnishKMBtech/archon-ai-Llama.cpp-kotlin-integration).

4. AWS & Honeypot-Based IDS (Intrusion Detection System)
   - Description: Deployed an AWS EC2 honeypot capturing network intrusion logs. Processed logs through a serverless ETL pipeline (AWS Lambda) into 2M+ time-series rows daily to train a Random Forest classifier.
   - Stack: Scikit-learn, EC2, Lambda, SageMaker.
   - Links: GitHub (AnishKMBtech/AI-fradulent-detecion).

5. Pressure-Based Racing Sim
   - Description: Analog keyboard input emulator in AutoHotkey v2 translating binary keyboard presses into progressive, analog-style throttle and brake inputs for racing sim stability. Standalone executable optimized for Project Cars.
   - Links: GitHub (AnishKMBtech/pressure_based_acceleration_simulation).

6. Multi-Agent Event Planner (A2A)
   - Description: Developed a multi-agent system for event planning using Google ADK, GraphQL, and Gemini Enterprise. Utilizes the MCP (Model, Context, Protocol, Memory) foundation and an A2A (Agent-to-Agent) orchestrator for communication between specialized agents like the Event Planner and Platform Interaction agent.
   - Stack: Google ADK, Gemini Enterprise, GraphQL, MCP, GCP, GraphDB, PostgreSQL.
   - Deployed on: Google Cloud Platform (GCP).

### WRITING & BLOGS
- Article: "From Transformers to Quantization: My Hands-On Journey with ORPO, LLaMA 3.2 1B" on Medium.
- Details: Covers transformer internals, quantization mathematical details (bit-precision, scale/zeros), PTQ vs QAT, K-quant algorithms, and offline inference performance.

### SKILLS
- Languages: Python, Kotlin, Kotlin Multiplatform, C/C++, SQL, Shell Scripting, AutoHotkey.
- AI/ML: LLM Fine-Tuning (LoRA, QLoRA, ORPO), Quantization (llama.cpp, GGUF), Computer Vision (SigLip, ResNet, VLMs), Scikit-learn, PyTorch, Hugging Face Ecosystem.
- Cloud & DevOps: AWS (EC2, Lambda, SageMaker, S3), GitHub Actions CI/CD.
- OS: Arch Linux (primary dev OS), Termux, Kali Linux, Windows.

### Social handles 
- Mail - anishkmwork@gmail.com 

he is currently looking for sde roles and in his final year of btech Artificial intelligence and data science in SRM EEC, chennai,tamil nadu,India.
he is into python right now and artificial intelligence.
Use this knowledge base to answer questions accurately. If a user asks a question that is not covered here, kindly reply that you don't have that information but would be happy to discuss Anish's AI engineering and Linux background.`;

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
      const apiUrl = '/api/chat/groq';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: "system", content: PORTFOLIO_SYSTEM_PROMPT },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: messageText }
          ],
          stream: true
        }),
      });

      if (!response.ok) {
        let errorMessage = 'Failed to fetch from Groq';
        try {
          const errorText = await response.text();
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch {
            if (errorText) errorMessage = errorText;
          }
        } catch {
          // ignore read errors
        }
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const data = await response.json();
        const content = data.content || data.message || '';
        const reasoning = data.reasoning || '';

        setMessages(prev => prev.map(m =>
          m.id === assistantMessageId
            ? { ...m, content, reasoning }
            : m
        ));
        return;
      }

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
          ? { ...m, content: error instanceof Error ? error.message : "I encountered an error. Please try again later." } 
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
