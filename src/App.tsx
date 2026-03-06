import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Home, Clock, Briefcase, Brain } from 'lucide-react';
import { NavBar } from "@/components/ui/tubelight-navbar";
import { LandingPage } from "@/pages/LandingPage";
import { JourneyPage } from "@/pages/JourneyPage";
import { TimelinePage } from "@/pages/TimelinePage";
import { ProjectsPage } from "@/pages/ProjectsPage";
import { AIPage } from "@/pages/AIPage";
import { AnimatePresence, motion } from "framer-motion";
import { HelloIntro } from "@/components/ui/hello-intro";

const App = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Journey', url: '/journey', icon: Clock },
    { name: 'Timeline', url: '/timeline', icon: Clock },
    { name: 'Projects', url: '/projects', icon: Briefcase },
    { name: 'AI', url: '/ai', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-500/30">
      <AnimatePresence>
        {showIntro && <HelloIntro onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {!showIntro && (
        <>
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
                <Route path="/journey" element={<JourneyPage />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/ai" element={<AIPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default App;
