import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Hello",
  "Hola",
  "Bonjour",
  "Ciao",
  "Hallo",
  "नमस्ते",
];

export const HelloIntro = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < greetings.length - 1) {
      const timer = setTimeout(() => setIndex(index + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(onComplete, 1000);
      return () => clearTimeout(timer);
    }
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a0a0a]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={greetings[index]}
          className="text-6xl md:text-8xl font-sans font-medium tracking-tight text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {greetings[index]}
        </motion.h1>
      </AnimatePresence>
    </motion.div>
  );
};
