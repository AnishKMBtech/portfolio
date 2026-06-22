import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, BookOpen, Cpu, Play, Layers, ExternalLink, Terminal, ArrowUpRight, Database, Sparkles, ArrowLeft, CheckCircle2, ShieldCheck, Activity, Key, ShieldAlert, Smartphone, Download } from "lucide-react";

interface StackItem {
  name: string;
  category: string;
}

interface LinkItem {
  label: string;
  url: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  oneliner: string;
  desc: string;
  publishedDesc: string;
  stack: StackItem[];
  links: LinkItem[];
}

export const ProjectsPage = () => {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: "multi-agent-event",
      title: "Multi-Agent Event Planner (A2A)",
      subtitle: "Multi-Agent Chat for Event Planning",
      oneliner: "A multi-agent system powered by Google ADK, GraphQL, and Gemini Enterprise, utilizing MCP for structured context and A2A orchestration for event planning.",
      desc: "Developed a sophisticated multi-agent system for event planning during a GDG event at Ford Business Solutions. The architecture leverages the Model, Context, Protocol, and Memory (MCP) foundation alongside Google's Agent Development Kit (ADK). It features an A2A (Agent-to-Agent) orchestrator that manages communication between specialized agents, including an Event Planner and a Platform Interaction agent. The system uses a Reasoning Module (RM) to structure decisions and operates within a looped agent setup, supporting both sequential and parallel designs.",
      publishedDesc: "Deployed on Google Cloud Platform (GCP) utilizing GraphDB, PostgreSQL, and GCP Buckets. The implementation follows A2A protocol standards for time-sensitive, multi-modal interactions and features a robust client-to-remote agent design.",
      stack: [
        { name: "Google ADK", category: "Agent Framework" },
        { name: "Gemini Enterprise", category: "LLM" },
        { name: "GraphQL", category: "API" },
        { name: "MCP", category: "Foundation" },
        { name: "GCP", category: "Cloud" },
        { name: "GraphDB", category: "Database" },
        { name: "PostgreSQL", category: "Relational DB" }
      ],
      links: [
        {
          label: "LinkedIn Post",
          url: "https://www.linkedin.com/posts/anish-k-m-273670319_llm-mcp-adk-activity-7352401004845305856-GR_n",
          icon: ExternalLink,
          color: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5"
        }
      ]
    },
    {
      id: "llm-quant",
      title: "LLM Fine-Tuning & Quantization",
      subtitle: "LLaMA 3.2 1B Alignment & Edge Inference",
      oneliner: "Fine-tuned Meta's LLaMA 3.2 1B using ORPO and quantized to GGUF (~70% size reduction) for efficient local CPU inference.",
      desc: "Fine-tuned Meta's LLaMA 3.2 1B model using ORPO (Odds Ratio Preference Optimization) on a curated 15k-sample subset of the orpo-dpo-mix-40k preference dataset, enabling better instruction-following and alignment without a separate reference model. Applied LoRA/QLoRA-based parameter-efficient fine-tuning to keep compute costs low. Post fine-tuning, performed GGUF quantization via llama.cpp — converting the model from FP16 (~2.3 GB) down to Q4_K_M (~700 MB), achieving a ~70% size reduction while preserving coherent outputs for local CPU inference.",
      publishedDesc: "The quantized model is published on Hugging Face. Also authored a technical blog on Medium covering the end-to-end journey — from transformer internals and bit-precision tradeoffs to K-quant algorithms, PTQ vs QAT, and hardware-aware inference considerations.",
      stack: [
        { name: "Python", category: "Language" },
        { name: "PyTorch", category: "Framework" },
        { name: "Unsloth", category: "Fine-tuning" },
        { name: "llama.cpp", category: "Inference" },
        { name: "GGUF", category: "Quantization" },
        { name: "Hugging Face", category: "Platform" },
        { name: "Google Colab", category: "Compute" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/AnishKMBtech/LLM-Quantisation-LLAMA3.2",
          icon: Github,
          color: "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5"
        },
        {
          label: "HuggingFace Model",
          url: "https://huggingface.co/ANISH-j/Quantized-Llama-3.2-1B-15k",
          icon: Database,
          color: "hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5"
        },
        {
          label: "Colab Notebook",
          url: "https://colab.research.google.com/drive/1bZOnFp01XcLaYYWt2xJ5LAzOD9msvEZL?usp=sharing",
          icon: Play,
          color: "hover:text-orange-400 hover:border-orange-500/30 hover:bg-orange-500/5"
        },
        {
          label: "Medium Blog",
          url: "https://medium.com/@anishbtechaiads/from-transformers-to-quantization-my-hands-on-journey-with-orpo-llama-3-2-1b-15k-800b5a433dbe?postPublishedType=initial",
          icon: BookOpen,
          color: "hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5"
        }
      ]
    },
    {
      id: "hflocal",
      title: "hflocal — Python Library",
      subtitle: "Published on PyPI & Automated via CI/CD",
      oneliner: "An open-source Python library that simplifies downloading, saving, and loading Hugging Face models offline with clean developer abstractions.",
      desc: "Built and published hflocal, an open-source Python library that simplifies downloading, saving, and reusing Hugging Face models locally. The library exposes three clean abstractions — save_model to pull and persist any open-source HF model and tokenizer to disk, load_model to restore them instantly without re-downloading, and a ModelPipeline class for straight-to-inference usage. Designed to be a drop-in utility for developers who want offline or reproducible model access without dealing with HF internals directly.",
      publishedDesc: "Set up an automated CI/CD pipeline using GitHub Actions to handle versioning and publish releases directly to the official PyPI registry on every tagged commit — making the package installable globally via pip install hflocal.",
      stack: [
        { name: "Python", category: "Language" },
        { name: "HF Transformers", category: "Framework" },
        { name: "GitHub Actions", category: "CI/CD" },
        { name: "PyPI", category: "Registry" },
        { name: "Twine", category: "Publishing" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/AnishKMBtech/hflocal",
          icon: Github,
          color: "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5"
        },
        {
          label: "PyPI Project",
          url: "https://pypi.org/project/hflocal/",
          icon: Database,
          color: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5"
        }
      ]
    },
    {
      id: "racingsim",
      title: "Pressure-Based Racing Sim",
      subtitle: "Analog Keyboard Input Emulator",
      oneliner: "Translates binary keyboard throttle/brake keys into progressive analog inputs for racing simulation stability.",
      desc: "Racing simulators on keyboard suffer from a fundamental problem — throttle and brake inputs are binary (fully on or fully off), making vehicles twitchy, prone to wheelspin, and difficult to control. This tool bridges that gap by intercepting keyboard key-hold events and translating the duration of each press into a graduated analog-style throttle/brake value, mimicking the gradual pressure you'd apply on a physical pedal. Built using AutoHotkey, the script runs as a background process and applies time-based input curves to acceleration and braking keys globally, making the in-game response feel progressive rather than instant.",
      publishedDesc: "Tested and tuned for Project Cars, with the logic compiled into a standalone .exe for easy plug-and-play use without needing a full AHK install. The result is noticeably improved stability out of corners, reduced oversteer on acceleration, and more controlled braking — all on a plain keyboard.",
      stack: [
        { name: "AutoHotkey v2", category: "Scripting" },
        { name: "Windows API", category: "OS Hooking" },
        { name: "Input Simulation", category: "Driver emulation" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/AnishKMBtech/pressure_based_acceleration_simulation",
          icon: Github,
          color: "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5"
        }
      ]
    },
    {
      id: "honeypot-ids",
      title: "AWS & Honeypot-Based IDS",
      subtitle: "Intrusion Detection & ML Pipeline on AWS",
      oneliner: "Deployed an AWS honeypot capturing live network logs, scaling data to 2M+ time-series rows daily to train a Random Forest IDS classifier.",
      desc: "Deployed a honeypot on AWS EC2 to act as a deliberate lure for real-world attackers, continuously capturing live network intrusion data over 10 days. Each day's raw batch logs (~22,000 rows per cycle) were processed through a feature engineering pipeline that expanded timestamped records into over 2 million time-series rows per day — enabling sequential and temporal pattern detection across attack progressions rather than treating each event in isolation. Trained a multi-class Random Forest classifier on this enriched dataset to distinguish between multiple attack categories (port scans, brute-force, DoS, etc.) with high precision on imbalanced live data.",
      publishedDesc: "The full pipeline was orchestrated on AWS — EC2 for the honeypot and data capture, Lambda functions for event-driven log processing and batch triggers, and SageMaker for model training, versioning, and inference. The end result is a production-style IDS that detects anomalies on incoming traffic in near real-time using patterns learned from genuine attack behaviour.",
      stack: [
        { name: "Python", category: "Language" },
        { name: "Scikit-learn", category: "ML Library" },
        { name: "AWS EC2", category: "Cloud Lure" },
        { name: "AWS Lambda", category: "Serverless ETL" },
        { name: "AWS SageMaker", category: "ML Lifecycle" },
        { name: "Pandas", category: "Data Wrangling" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/AnishKMBtech/AI-fradulent-detecion",
          icon: Github,
          color: "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5"
        }
      ]
    },
    {
      id: "archon-ai",
      title: "Archon AI — Offline Assistant",
      subtitle: "Offline Android LLM Inference (llama.cpp)",
      oneliner: "A fully offline, privacy-first Android AI assistant running GGUF LLMs locally on ARM64 hardware via llama.cpp and JNI.",
      desc: "Built a fully offline, privacy-first AI assistant for Android that runs quantized LLMs entirely on-device with zero cloud dependency. Integrated llama.cpp into an Android app via JNI (C/C++ native bridge), enabling GGUF model inference directly on ARM64 hardware. The app supports real-time token streaming, dynamic model loading and switching, and a clean modern chat UI built with Jetpack Compose — all without a single network call.",
      publishedDesc: "Tested and validated across four major model architectures — LLaMA 3 1B, Gemma 1B, Qwen 2.5 0.5B, and DeepSeek 1.5B — confirming broad GGUF compatibility on mobile. Q4_K_M quantization was used to keep models under 1GB while retaining coherent output quality. Shipped as a distributable APK with optimized GGUF models hosted on Hugging Face.",
      stack: [
        { name: "Kotlin", category: "Language" },
        { name: "Jetpack Compose", category: "UI" },
        { name: "llama.cpp", category: "Inference Engine" },
        { name: "GGUF", category: "Model Format" },
        { name: "JNI (C/C++)", category: "Bridge" },
        { name: "Android 13+", category: "OS" },
        { name: "Hugging Face", category: "Hosting" }
      ],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/AnishKMBtech/archon-ai-Llama.cpp-kotlin-integration",
          icon: Github,
          color: "hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5"
        },
        {
          label: "Download APK",
          url: "https://github.com/AnishKMBtech/archon-ai-Llama.cpp-kotlin-integration/releases/tag/master",
          icon: Download,
          color: "hover:text-blue-400 hover:border-blue-500/30 hover:bg-blue-500/5"
        },
        {
          label: "GGUF Models",
          url: "https://huggingface.co/ANISH-j/gguf-models-for-archon-ai/tree/main",
          icon: Database,
          color: "hover:text-amber-400 hover:border-amber-500/30 hover:bg-amber-500/5"
        }
      ]
    }
  ];

  const activeProject = projects.find(p => p.id === activeProjectId);

  const renderVisualPanel = (id: string) => {
    switch (id) {
      case "multi-agent-event":
        return (
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400 space-y-6 shadow-inner relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Cpu size={14} className="text-blue-400" />
                <span className="text-zinc-300 font-bold">A2A Orchestrator Engine</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500">orchestration_active</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Terminal size={18} />
                  </div>
                  <span className="text-[9px] text-zinc-500">Planner Agent</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-right from-blue-500/0 via-blue-500/40 to-blue-500/0 mx-2 relative">
                  <div className="absolute inset-0 animate-pulse bg-blue-400/20 blur-sm" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Activity size={20} />
                  </div>
                  <span className="text-[9px] text-zinc-300 font-bold">A2A ORCH</span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-right from-blue-500/0 via-blue-500/40 to-blue-500/0 mx-2" />
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <Database size={18} />
                  </div>
                  <span className="text-[9px] text-zinc-500">Platform Agent</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-900/40 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-500 block">FOUNDATION</span>
                  <span className="text-blue-400 font-bold flex items-center gap-1">
                    <ShieldCheck size={12} />
                    MCP Architecture
                  </span>
                </div>
                <div className="p-3 bg-zinc-900/40 rounded-xl border border-white/5 space-y-1">
                  <span className="text-[10px] text-zinc-500 block">DECISION_ENGINE</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles size={12} />
                    Reasoning Module
                  </span>
                </div>
              </div>

              <div className="p-3 bg-zinc-950/80 rounded-lg border border-white/5 text-[10px] space-y-2">
                <div className="flex justify-between items-center text-zinc-500 font-mono">
                  <span>A2A PROTOCOL LOG</span>
                  <span className="text-blue-500/60">LIVE</span>
                </div>
                <div className="font-mono space-y-1">
                  <div className="flex gap-2">
                    <span className="text-blue-500/60">&gt;</span>
                    <span className="text-zinc-400">NEGOTIATING_TIME_SLOT</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500/60">&gt;</span>
                    <span className="text-emerald-400/80">CONTEXT_SYNC: COMPLETE</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-blue-500/60">&gt;</span>
                    <span className="text-zinc-500 text-[9px]">GCP_BUCKET_PUSH: OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "llm-quant":
        return (
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400 space-y-6 shadow-inner relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-emerald-400" />
                <span className="text-zinc-300 font-bold">Quantization Inspector</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500">inference_ready</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-500">model_identifier</span>
              <div className="text-zinc-200 bg-zinc-900/60 border border-white/5 p-2.5 rounded-lg flex items-center justify-between">
                <span>Meta-Llama-3.2-1B-Instruct</span>
                <span className="text-[10px] text-emerald-400/80 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 font-bold">ORPO</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-zinc-500">quantization_ratio</span>
                <span className="text-emerald-400 font-bold text-sm">-70% Size</span>
              </div>

              <div className="space-y-2.5 bg-zinc-900/40 p-3 rounded-xl border border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-400">FP16 (Original)</span>
                    <span className="text-zinc-300 font-bold">2.3 GB</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-zinc-600 rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-emerald-400 font-semibold">Q4_K_M (Quantized GGUF)</span>
                    <span className="text-emerald-400 font-bold">700 MB</span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "30.4%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-2.5 bg-zinc-900/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500">ALIGNMENT_METHOD</span>
                <span className="block text-zinc-200 font-bold text-xs flex items-center gap-1">
                  <Sparkles size={10} className="text-emerald-400" />
                  ORPO (Single-step)
                </span>
              </div>
              <div className="p-2.5 bg-zinc-900/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500">TARGET_HARDWARE</span>
                <span className="block text-zinc-200 font-bold text-xs flex items-center gap-1">
                  <Layers size={10} className="text-emerald-400" />
                  Local CPU / Edge
                </span>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/80 rounded-lg border border-white/5 text-[10px] text-zinc-500 leading-tight space-y-1 font-mono">
              <div className="flex gap-2">
                <span className="text-emerald-500/60">$</span>
                <span>llama-bench -m llama-3.2-1b-q4_k_m.gguf</span>
              </div>
              <div className="text-zinc-600">
                <span>system_info: n_threads = 4 | AVX2 = 1 | FMA = 1</span>
              </div>
              <div className="text-emerald-400/80 animate-pulse">
                <span>eval time = 12.35 ms / tok (80.97 tokens/sec)</span>
              </div>
            </div>
          </div>
        );

      case "hflocal":
        return (
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400 space-y-6 shadow-inner relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-emerald-400" />
                <span className="text-zinc-300 font-bold">hflocal Architecture</span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[10px] text-zinc-500">v0.1.0 (stable)</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-500">installation</span>
              <div className="text-zinc-200 bg-zinc-900/60 border border-white/5 p-2.5 rounded-lg flex items-center justify-between">
                <span className="text-emerald-400">pip install hflocal</span>
                <span className="text-[10px] text-zinc-500 font-bold">pypi.org</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-zinc-500">library_workflow</span>
              <div className="p-3 bg-zinc-900/40 rounded-xl border border-white/5 space-y-2 text-[10px]">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-bold">save_model()</span>
                  <span className="text-zinc-500">Hugging Face Hub ➔ Local Cache</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-bold">load_model()</span>
                  <span className="text-zinc-500">Restore instantly offline</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-bold">ModelPipeline</span>
                  <span className="text-emerald-400 font-bold">Straight to inference</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-zinc-500">usage_example.py</span>
              <div className="p-3 bg-zinc-950/80 rounded-lg border border-white/5 text-[10px] leading-relaxed text-zinc-300 space-y-1.5">
                <div>
                  <span className="text-zinc-500 font-semibold">import</span> hflocal
                </div>
                <div>
                  <span className="text-zinc-500 font-semibold"># Cache any HF model locally</span>
                  <br />
                  hflocal.save_model(<span className="text-emerald-400">"Qwen/Qwen2.5-0.5B"</span>, <span className="text-emerald-400">"./cache"</span>)
                </div>
                <div>
                  <span className="text-zinc-500 font-semibold"># Load instantly offline</span>
                  <br />
                  model, tokenizer = hflocal.load_model(<span className="text-emerald-400">"./cache"</span>)
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/40 rounded-xl border border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 uppercase">CI/CD Pipeline</span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-200 font-bold">
                <CheckCircle2 size={12} className="text-emerald-400" />
                GitHub Actions ➔ PyPI
              </span>
            </div>
          </div>
        );

      case "racingsim":
        return (
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400 space-y-6 shadow-inner relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-emerald-400" />
                <span className="text-zinc-300 font-bold">Pedal Telemetry Hook</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500">mapping_active</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-zinc-500">active_binary</span>
              <div className="text-zinc-200 bg-zinc-900/60 border border-white/5 p-2.5 rounded-lg flex items-center justify-between">
                <span className="text-emerald-400">pressure_sim.exe</span>
                <span className="text-[10px] text-zinc-500">AutoHotkey v2</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <span className="text-zinc-500">input_modulation</span>
                <span className="text-emerald-400 font-bold text-sm">Graduated Curves</span>
              </div>

              <div className="space-y-2.5 bg-zinc-900/40 p-3 rounded-xl border border-white/5">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-zinc-400">Binary (Raw Press)</span>
                    <span className="text-zinc-300">Instant 100%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded overflow-hidden">
                    <div className="h-full bg-red-500/70" style={{ width: "100%" }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-emerald-400 font-semibold">AHK Emulated Pedal (Hold duration)</span>
                    <span className="text-emerald-400 font-bold">Gradual 0% ➔ 100%</span>
                  </div>
                  <div className="h-2 w-full bg-zinc-800 rounded overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-pulse" style={{ width: "65%" }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-2.5 bg-zinc-900/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500">POLLING_RATE</span>
                <span className="block text-zinc-200 font-bold text-xs flex items-center gap-1">
                  <Key size={10} className="text-emerald-400" />
                  1000 Hz / &lt;1ms
                </span>
              </div>
              <div className="p-2.5 bg-zinc-900/40 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-zinc-500">SUPPORTED_GAMES</span>
                <span className="block text-zinc-200 font-bold text-xs flex items-center gap-1">
                  <Layers size={10} className="text-emerald-400" />
                  Project Cars / Any
                </span>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/80 rounded-lg border border-white/5 text-[10px] text-zinc-500 leading-tight space-y-1 font-mono">
              <div className="flex gap-2">
                <span className="text-emerald-500/60">$</span>
                <span>pressure_sim.exe --monitor</span>
              </div>
              <div>
                <span className="text-zinc-600">[HOOK] Intercepted 'W' (Throttle key)</span>
              </div>
              <div className="text-emerald-400/80">
                <span>mapping key-hold duration 250ms {"->"} JoyY: 62%</span>
              </div>
            </div>
          </div>
        );

      case "honeypot-ids":
        return (
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400 space-y-5 shadow-inner relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-emerald-400" />
                <span className="text-zinc-300 font-bold">AWS Honeypot Telemetry</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-bold">IDS_ONLINE</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-zinc-500 text-[10px]">data_pipeline_orchestration</span>
              <div className="p-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-[9px] text-zinc-300 space-y-1 leading-relaxed">
                <div className="flex items-center justify-between text-zinc-400 animate-pulse font-bold">
                  <span>LURE</span>
                  <span>ETL</span>
                  <span>MODEL</span>
                </div>
                <div className="flex items-center justify-between text-zinc-200">
                  <span className="px-1.5 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400">EC2</span>
                  <span>➔</span>
                  <span className="px-1.5 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">Lambda</span>
                  <span>➔</span>
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">SageMaker</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-zinc-500">feature_engineering_stats</span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 bg-zinc-900/40 border border-white/5 rounded-lg space-y-0.5">
                  <span className="text-zinc-500 block text-[9px]">RAW_BATCH_LOGS</span>
                  <span className="text-zinc-300 font-bold">~22K rows / day</span>
                </div>
                <div className="p-2 bg-zinc-900/40 border border-white/5 rounded-lg space-y-0.5">
                  <span className="text-emerald-400 block text-[9px] font-bold">ENRICHED_SERIES</span>
                  <span className="text-emerald-400 font-bold">2M+ rows / day</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-zinc-500">classifier_status</span>
              <div className="p-2.5 bg-zinc-900/40 border border-white/5 rounded-xl space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span>Algorithm:</span>
                  <span className="text-zinc-200 font-bold">Multi-class Random Forest</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span>Target Anomaly:</span>
                  <span className="text-zinc-200 font-bold">Port Scan, Brute Force, DoS</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/80 rounded-lg border border-white/5 text-[9px] text-zinc-500 leading-tight space-y-1 font-mono">
              <div className="text-red-400/80 flex justify-between">
                <span>[ALERT] EC2 Honeypot Intrusion Detected</span>
                <span>now</span>
              </div>
              <div>
                <span>Source: 198.51.100.42 | Port: 22</span>
              </div>
              <div className="text-zinc-600">
                <span>Classification: Brute-Force SSH (98.4% Confidence)</span>
              </div>
            </div>
          </div>
        );

      case "archon-ai":
        return (
          <div className="p-6 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400 space-y-5 shadow-inner relative overflow-hidden backdrop-blur-md">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none" />

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <Smartphone size={14} className="text-emerald-400" />
                <span className="text-zinc-300 font-bold">Mobile Native Telemetry</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-bold">JNI_CONNECTED</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-zinc-500 text-[10px]">native_bridge_flow</span>
              <div className="p-2.5 bg-zinc-900/60 border border-white/5 rounded-xl text-[9px] text-zinc-300 space-y-1 leading-relaxed">
                <div className="flex items-center justify-between text-zinc-400 font-bold">
                  <span>UI</span>
                  <span>BRIDGE</span>
                  <span>ENGINE</span>
                  <span>CPU/GPU</span>
                </div>
                <div className="flex items-center justify-between text-zinc-200">
                  <span className="text-orange-400">Compose</span>
                  <span>➔</span>
                  <span className="text-yellow-400">JNI</span>
                  <span>➔</span>
                  <span className="text-indigo-400">llama.cpp</span>
                  <span>➔</span>
                  <span className="text-emerald-400">ARM64</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-zinc-500">validated_architectures</span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 bg-zinc-900/40 border border-white/5 rounded-lg space-y-0.5">
                  <span className="text-zinc-500 block text-[8px]">TESTED_MODELS</span>
                  <span className="text-zinc-200 font-bold">DeepSeek, LLaMA 3, Gemma, Qwen</span>
                </div>
                <div className="p-2 bg-zinc-900/40 border border-white/5 rounded-lg space-y-0.5">
                  <span className="text-emerald-400 block text-[8px] font-bold">QUANT_FORMAT</span>
                  <span className="text-emerald-400 font-bold">GGUF Q4_K_M (&lt;1GB)</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-zinc-950/80 rounded-lg border border-white/5 text-[9px] text-zinc-500 leading-tight space-y-1 font-mono">
              <div>
                <span className="text-zinc-500">[Archon] Loading LLaMA-3-1B-Instruct...</span>
              </div>
              <div>
                <span className="text-zinc-600">[llama.cpp] system_info: ARM64 NEON = 1 | Threads = 4</span>
              </div>
              <div className="text-emerald-400/80 animate-pulse">
                <span>[Archon] Streaming tokens locally...</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-32 pb-24 px-4 md:px-6 relative overflow-hidden flex flex-col justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_0%,transparent_70%)]"></div>
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.02)_0%,transparent_70%)]"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <AnimatePresence mode="wait">
          {!activeProjectId ? (
            <motion.div
              key="list-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="mb-12 text-center md:text-left">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 uppercase">
                  Selected Works
                </span>
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-zinc-100 mt-4 mb-4 tracking-tighter">
                  My <span className="text-emerald-400">Projects</span>
                </h2>
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest max-w-xl">
                  Deep dive into my recent work in large language model fine-tuning, cloud security, on-device mobile AI, and open-source tooling.
                </p>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
                {projects.map((proj) => (
                  <motion.div
                    key={proj.id}
                    onClick={() => {
                      console.log("Project card clicked:", proj.id);
                      setActiveProjectId(proj.id);
                    }}
                    className="p-8 rounded-[2rem] bg-zinc-900/20 border border-white/5 backdrop-blur-xl hover:border-emerald-500/30 transition-all duration-350 cursor-pointer group relative overflow-hidden shadow-xl flex flex-col justify-between"
                    whileHover={{ y: -4 }}
                  >
                    <div>
                      <div className="absolute top-0 right-0 p-6 opacity-40 group-hover:opacity-100 group-hover:text-emerald-400 transition-all pointer-events-none">
                        <ArrowUpRight size={24} />
                      </div>
                      
                      <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs mb-3">
                        <Cpu size={14} className="text-emerald-400" />
                        <span>
                          {proj.id === "llm-quant" ? "Edge AI & Alignment" : proj.id === "hflocal" ? "Developer Tools" : proj.id === "racingsim" ? "Input Scripts" : proj.id === "archon-ai" ? "On-Device Mobile AI" : "Cloud & Security ML"}
                        </span>
                      </div>

                      <h3 className="text-2xl font-display font-bold text-zinc-100 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                        {proj.title}
                      </h3>
                      <p className="text-[10px] font-mono text-zinc-400 mt-1 mb-4">
                        {proj.subtitle}
                      </p>

                      <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                        {proj.oneliner}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {proj.stack.slice(0, 3).map((s, index) => (
                          <span
                            key={index}
                            className="px-2.5 py-0.5 rounded-md bg-zinc-900 border border-white/5 text-[10px] font-mono text-zinc-400"
                          >
                            {s.name}
                          </span>
                        ))}
                        {proj.stack.length > 3 && (
                          <span className="px-2.5 py-0.5 rounded-md bg-zinc-900/40 text-[10px] font-mono text-zinc-500">
                            +{proj.stack.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold group-hover:underline">
                        Explore Technical Specs & Assets
                        <span>➔</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Button */}
              <div className="mb-8">
                <button
                  onClick={() => setActiveProjectId(null)}
                  className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-emerald-400 transition-colors group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Projects
                </button>
              </div>

              {/* Detailed Dashboard Card */}
              {activeProject && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-10 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-500 shadow-2xl">
                  {/* Card Border Glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Left Column - Details */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-8 relative z-10">
                    <div>
                      <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs mb-3">
                        <Cpu size={14} className="text-emerald-400" />
                        <span>
                          {activeProject.id === "llm-quant" ? "Edge AI & Alignment" : activeProject.id === "hflocal" ? "Developer Tools & Libraries" : activeProject.id === "racingsim" ? "Keyboard Scripting & OS Hooks" : activeProject.id === "archon-ai" ? "On-Device Mobile Inference" : "Cloud & Security Machine Learning"}
                        </span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-display font-bold text-zinc-100 tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
                        {activeProject.title}
                      </h3>
                      <p className="text-sm font-mono text-zinc-400 mt-2">
                        {activeProject.subtitle}
                      </p>
                      
                      <div className="space-y-4 text-zinc-400 text-base md:text-lg mt-6 leading-relaxed">
                        <p>{activeProject.desc}</p>
                        <p className="text-zinc-500 text-sm md:text-base border-l-2 border-emerald-500/30 pl-4 italic">
                          {activeProject.publishedDesc}
                        </p>
                      </div>
                    </div>

                    {/* Stack Badges */}
                    <div>
                      <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.stack.map((s, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 border border-white/5 text-xs font-mono text-zinc-300 hover:border-emerald-500/20 hover:text-white transition-all cursor-default"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                            <span>{s.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div>
                      <h4 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">Project Assets</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {activeProject.links.map((link, index) => {
                          const Icon = link.icon;
                          return (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center justify-between px-3 py-2.5 rounded-xl bg-zinc-900/60 border border-white/5 text-xs font-mono text-zinc-300 transition-all duration-300 ${link.color}`}
                            >
                              <span className="flex items-center gap-1.5">
                                <Icon size={14} />
                                {link.label}
                              </span>
                              <ArrowUpRight size={10} className="opacity-40" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Visual Inspector Panel */}
                  <div className="lg:col-span-5 flex flex-col justify-center relative z-10">
                    {renderVisualPanel(activeProject.id)}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
