import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const ProjectsPage = () => {
  const projects = [
    {
      title: "GenAI Model Builder",
      desc: "A custom framework for fine-tuning LLMs on edge devices with limited VRAM.",
      tech: ["Python", "PyTorch", "Transformers"],
    },
    {
      title: "Arch Linux Dotfiles",
      desc: "My highly optimized Sway/Wayland configuration for maximum productivity.",
      tech: ["Lua", "Shell", "Sway"],
    },
    {
      title: "CV Object Detection",
      desc: "Real-time object detection system for specialized industrial use cases.",
      tech: ["C++", "OpenCV", "CUDA"],
    },
    {
      title: "Probabilistic Modelling",
      desc: "Research project on uncertainty estimation in deep neural networks.",
      tech: ["JAX", "NumPy", "LaTeX"],
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-7xl font-display font-bold text-zinc-100 mb-4 tracking-tighter">Selected <span className="text-emerald-400">Projects</span></h2>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">A collection of my technical work</p>
          </div>
          <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block mb-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-10 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={24} className="text-emerald-500 -rotate-45" />
              </div>
              <h3 className="text-3xl font-bold text-zinc-100 mb-6 group-hover:text-emerald-400 transition-colors">{p.title}</h3>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-md">{p.desc}</p>
              <div className="flex flex-wrap gap-3">
                {p.tech.map((t, j) => (
                  <span key={j} className="text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
