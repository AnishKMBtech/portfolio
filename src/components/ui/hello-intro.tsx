import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "こんにちは", 
  "你好",
];

export const HelloIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={greetings[index]}
          className="text-6xl md:text-8xl font-sans font-medium tracking-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {greetings[index]}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
};
