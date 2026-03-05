import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, Clock, Briefcase, Brain } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { LandingPage } from "@/pages/LandingPage";
import { TimelinePage } from "@/pages/TimelinePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { AIPage } from "@/pages/AIPage";
import { AnimatePresence, motion } from "framer-motion";

const App = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Timeline', url: '/timeline', icon: Clock },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'AI', url: '/ai', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-500/30">
      <NavBar items={navItems} />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/ai" element={<AIPage />} />
          </Routes>
        </motion.div>
      </AnimatePresence>

      {/* Global Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-xl font-display font-bold text-zinc-100 mb-2 tracking-tighter">ANISH <span className="text-emerald-500">B.</span></div>
            <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest">AI Engineer • Linux Enthusiast</div>
          </div>
          <div className="flex gap-8 text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <a href="#" className="hover:text-emerald-400 transition-colors">GitHub</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Twitter</a>
          </div>
          <div className="text-[10px] font-mono text-zinc-600">
            © 2025 • BUILT WITH ARCH LINUX
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
