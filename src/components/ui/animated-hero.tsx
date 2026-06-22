import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MoveRight, Mail, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const navigate = useNavigate();
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["code", "game", "build"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="glass px-6 py-2 rounded-full border border-white/10">
            <span className="text-sm font-mono text-emerald-400">Welcome to my space</span>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-display font-bold">
              <span className="text-white">Hi, Im Anish K M!</span>
              <br />
              <span className="text-white">I Love to </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1 text-emerald-400">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-zinc-400 max-w-2xl text-center glass p-6 rounded-2xl">
              a curiosity driven techy who is proud of telling "I use Arch BTW"
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Button size="lg" className="gap-4 glass" variant="ghost" onClick={() => navigate('/journey')}>
              Check my work <MoveRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-6 mt-4">
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://in.linkedin.com/in/anish-k-m-273670319"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass border border-white/10 text-zinc-400 hover:text-blue-400 transition-colors"
                title="LinkedIn"
            >
                <Linkedin size={20} />
            </motion.a>
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://github.com/AnishKMBtech"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass border border-white/10 text-zinc-400 hover:text-white transition-colors"
                title="GitHub"
            >
                <Github size={20} />
            </motion.a>
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="https://huggingface.co/ANISH-j"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass border border-white/10 flex items-center justify-center text-zinc-400 hover:text-yellow-400 transition-colors"
                title="Hugging Face"
            >
                <span className="flex items-center justify-center w-[20px] h-[20px] text-lg">🤗</span>
            </motion.a>
            <motion.a
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                href="mailto:anishkmwork@gmail.com"
                className="p-3 rounded-full glass border border-white/10 text-zinc-400 hover:text-emerald-400 transition-colors"
                title="Email"
            >
                <Mail size={20} />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
