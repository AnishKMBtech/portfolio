import React from 'react';
import { motion } from 'framer-motion';

export const BlogsPage = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-zinc-100">Blogs</h1>
        <p className="text-zinc-400 max-w-2xl leading-relaxed">
          Writing about model fine-tuning, quantization, and the practical side of shipping AI systems.
        </p>
      </div>

      <motion.a
        href="https://medium.com/@anishbtechaiads/from-transformers-to-quantization-my-hands-on-journey-with-orpo-llama-3-2-1b-15k-800b5a433dbe?postPublishedType=initial"
        target="_blank"
        rel="noreferrer"
        className="group block rounded-3xl border border-emerald-500/20 bg-zinc-900/60 p-6 md:p-8 shadow-2xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1 hover:border-emerald-400/40"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs uppercase tracking-[0.28em] text-emerald-400/80 font-mono">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">Medium</span>
          <span>ORPO</span>
          <span>Quantization</span>
          <span>LoRA / QLoRA</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 leading-tight mb-3 group-hover:text-emerald-300 transition-colors">
          From Transformers to Quantization: My Hands-On Journey with ORPO, LLaMA 3.2 1B
        </h2>

        <p className="text-zinc-400 leading-relaxed mb-6 max-w-3xl">
          Fine-tuned Meta&apos;s LLaMA 3.2 1B model with ORPO on a curated 15k-sample preference subset, used LoRA/QLoRA to keep compute costs low, and quantized the model with llama.cpp from FP16 (~2.3 GB) to Q4_K_M (~700 MB) for efficient local CPU inference.
        </p>

        <div className="flex items-center gap-2 text-emerald-400 font-medium">
          <span>Read on Medium</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </div>
      </motion.a>
    </motion.div>
  );
};
