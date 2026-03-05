import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { 
  ChevronDown,
  ArrowRight,
  Cpu,
  Database,
  Globe,
  Smartphone,
  Laptop
} from 'lucide-react';

// --- Sub-components ---

const VerticalTimeline = ({ progress }: { progress: any }) => {
  const years = [
    { year: '2019', label: 'High School' },
    { year: '2021', label: 'Senior School' },
    { year: '2023', label: '1st Year' },
    { year: '2024', label: '2nd Year' },
    { year: '2025', label: '3rd Year' }
  ];

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-8">
      <div className="absolute top-0 bottom-0 w-px bg-white/10 overflow-hidden">
        <motion.div 
          style={{ scaleY: progress }}
          className="w-full h-full bg-emerald-500 origin-top"
        />
      </div>
      {years.map((item, i) => {
        const step = i / (years.length - 1);
        return (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="relative flex flex-col items-center group"
          >
            <motion.div 
              style={{ 
                backgroundColor: useTransform(progress, [step - 0.1, step, step + 0.1], ["rgba(255,255,255,0.1)", "rgb(16, 185, 129)", "rgba(255,255,255,0.1)"])
              }}
              className="w-3 h-3 rounded-full border border-white/20 z-10 transition-colors"
            />
            <div className="absolute left-6 whitespace-nowrap">
              <div className="font-mono text-[10px] text-zinc-500 group-hover:text-emerald-400 transition-colors">{item.year}</div>
              <div className="font-display text-[11px] font-bold text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">{item.label}</div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

const DeviceFrame = ({ type, children, isOpen = true, label }: { type: 'phone' | 'laptop', children: React.ReactNode, isOpen?: boolean, label?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateXScroll = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  const [lidOpen, setLidOpen] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setLidOpen(true), 500);
      return () => clearTimeout(timer);
    } else {
      setLidOpen(false);
    }
  }, [isOpen]);

  if (type === 'phone') {
    return (
      <motion.div 
        ref={ref}
        style={{ rotateX: rotateXScroll, rotateY, perspective: 1000 }}
        className="relative mx-auto border-zinc-800 bg-zinc-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden"
      >
        <div className="w-[148px] h-[18px] bg-zinc-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
        <div className="w-full h-full bg-black relative overflow-hidden">
          {children}
        </div>
        {label && <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-500 uppercase tracking-widest">{label}</div>}
      </motion.div>
    );
  }

  return (
    <div className="relative mx-auto w-full max-w-4xl z-20" ref={ref}>
      <motion.div 
        initial={{ rotateX: -95 }}
        animate={{ rotateX: lidOpen ? 0 : -95 }}
        style={{ 
          rotateY: rotateY,
          transformOrigin: 'bottom', 
          perspective: '2000px' 
        }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 border-zinc-800 bg-zinc-900 border-[8px] rounded-t-xl overflow-hidden aspect-video shadow-2xl"
      >
        <div className="w-full h-full bg-black relative">
          <AnimatePresence>
            {lidOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="w-full h-full"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="relative h-4 bg-zinc-800 rounded-b-xl w-[105%] -left-[2.5%] shadow-lg">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-zinc-700 rounded-full"></div>
      </div>
      {label && <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs text-zinc-500 uppercase tracking-widest">{label}</div>}
    </div>
  );
};

const ArchLinuxOS = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [showDesktop, setShowDesktop] = useState(false);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ cmd: string, out: string | React.ReactNode }[]>([]);
  const [currentDir, setCurrentDir] = useState('~');
  const [isAutoTyping, setIsAutoTyping] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(2.4);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [files, setFiles] = useState<{ [key: string]: string[] }>({
    '~': ['projects/', 'skills/', 'bio.txt', 'README.md'],
    '~/projects': ['GenAI-Model-Builder/', 'Arch-Linux-Dotfiles/', 'CV-Object-Detection/'],
    '~/skills': ['Python', 'PyTorch', 'TensorFlow', 'CUDA', 'Docker', 'ArchLinux']
  });
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const bootSequence = [
    ":: mounting /dev/sda2 on /",
    ":: checking filesystems...",
    ":: starting systemd...",
    "[ OK ] Started Journal Service.",
    "[ OK ] Started Network Time Synchronization.",
    "[ OK ] Reached target Multi-User System.",
    "[ OK ] Started Arch Linux Desktop Environment.",
    "Welcome to Arch Linux (6.1.0-arch1-1)",
    "user@arch-acer:~$ startx"
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSequence.length) {
        setTerminalLines(prev => [...prev, bootSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowDesktop(true);
          setIsAutoTyping(true);
        }, 800);
      }
    }, 250);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showDesktop) {
      const interval = setInterval(() => {
        setCpuUsage(Math.floor(Math.random() * 15) + 5);
        setRamUsage(parseFloat((2.4 + Math.random() * 0.2).toFixed(1)));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showDesktop]);

  useEffect(() => {
    if (isAutoTyping) {
      const command = "neofetch";
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < command.length) {
          setInput(prev => prev + command[i]);
          i++;
        } else {
          clearInterval(typeInterval);
          setTimeout(() => {
            executeCommand("neofetch");
            setIsAutoTyping(false);
            inputRef.current?.focus();
          }, 500);
        }
      }, 100);
      return () => clearInterval(typeInterval);
    }
  }, [isAutoTyping]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const parts = cmdStr.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    let out: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        out = 'Available commands: ls, cd, cat, pwd, date, echo, uname, hostname, clear, neofetch, whoami, mkdir, touch';
        break;
      case 'ls':
        const list = files[currentDir] || [];
        out = list.join('  ');
        break;
      case 'pwd':
        out = currentDir.replace('~', '/home/user');
        break;
      case 'date':
        out = new Date().toString();
        break;
      case 'echo':
        out = args.join(' ');
        break;
      case 'uname':
        out = 'Linux arch-acer 6.1.0-arch1-1 x86_64 GNU/Linux';
        break;
      case 'hostname':
        out = 'arch-acer';
        break;
      case 'whoami':
        out = 'user';
        break;
      case 'cat':
        const file = args[0];
        if (file === 'bio.txt') {
          out = "I'm Anish, an AI Engineer focused on LLMs and Computer Vision.";
        } else if (file === 'readme.md') {
          out = "# Arch Journey\nTechnical evolution 2019-2025.";
        } else if (file) {
          out = `cat: ${file}: No such file or directory`;
        } else {
          out = 'usage: cat [file]';
        }
        break;
      case 'cd':
        const target = args[0];
        if (!target || target === '~') {
          setCurrentDir('~');
        } else if (target === '..') {
          if (currentDir !== '~') {
            const pathParts = currentDir.split('/');
            setCurrentDir(pathParts.slice(0, -1).join('/'));
          }
        } else {
          const newPath = currentDir === '~' ? `~/${target}` : `${currentDir}/${target}`;
          const cleanPath = newPath.replace(/\/$/, '');
          if (files[cleanPath]) {
            setCurrentDir(cleanPath);
          } else {
            out = `cd: no such directory: ${target}`;
          }
        }
        break;
      case 'mkdir':
        const dirName = args[0];
        if (dirName) {
          const newDirPath = currentDir === '~' ? `~/${dirName}` : `${currentDir}/${dirName}`;
          setFiles(prev => ({
            ...prev,
            [currentDir]: [...(prev[currentDir] || []), dirName + '/'],
            [newDirPath]: []
          }));
          out = `Created directory: ${dirName}`;
        } else {
          out = 'usage: mkdir [directory]';
        }
        break;
      case 'touch':
        const fileName = args[0];
        if (fileName) {
          setFiles(prev => ({
            ...prev,
            [currentDir]: [...(prev[currentDir] || []), fileName]
          }));
          out = `Created file: ${fileName}`;
        } else {
          out = 'usage: touch [file]';
        }
        break;
      case 'clear':
        setHistory([]);
        setInput('');
        return;
      case 'neofetch':
        out = (
          <div className="flex gap-4 font-mono text-[10px]">
            <div className="text-emerald-500 leading-none whitespace-pre">
              {`   /\\
  /  \\
 /\\   \\
/      \\`}
            </div>
            <div>
              <p className="text-emerald-400 font-bold">user@arch-acer</p>
              <p>--------------</p>
              <p>OS: Arch Linux</p>
              <p>Host: Acer Aspire Lite</p>
              <p>Kernel: 6.1.0</p>
              <p>Shell: zsh</p>
              <p>WM: Sway (Tiling)</p>
            </div>
          </div>
        );
        break;
      default:
        out = `zsh: command not found: ${cmd}`;
    }

    setHistory(prev => [...prev, { cmd: cmdStr, out }]);
    setCmdHistory(prev => [cmdStr, ...prev]);
    setHistoryIndex(-1);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex < cmdHistory.length) {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(cmdHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isAutoTyping) return;
    executeCommand(input);
  };

  if (!showDesktop) {
    return (
      <div className="w-full h-full bg-black p-6 font-mono text-emerald-500 text-xs overflow-hidden">
        {terminalLines.map((line, idx) => (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={idx} className="mb-1">
            {line}
          </motion.div>
        ))}
        <motion.div animate={{ opacity: [0, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2 h-3 bg-emerald-500 ml-1 align-middle" />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#0a0a0a] relative flex flex-col font-mono text-zinc-300 overflow-hidden border border-emerald-500/20 rounded-lg shadow-2xl">
      <div className="h-6 bg-black flex items-center justify-between px-3 text-[9px] border-b border-emerald-500/20 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-emerald-500 font-bold">1: TERMINAL</span>
          </div>
          <span className="opacity-30">2: BROWSER</span>
        </div>
        <div className="flex items-center gap-4 opacity-70">
          <div className="flex items-center gap-1.5"><Cpu size={10} className="text-blue-400" /><span>{cpuUsage}%</span></div>
          <div className="flex items-center gap-1.5"><Database size={10} className="text-emerald-400" /><span>{ramUsage}G</span></div>
          <span className="text-zinc-500">MAR 5 03:51</span>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-hidden flex flex-col cursor-text bg-[#0c0c0c]" onClick={() => inputRef.current?.focus()}>
        <div className="flex-1 overflow-auto custom-scrollbar pr-2">
          {history.map((item, i) => (
            <div key={i} className="mb-3">
              <div className="flex gap-2 items-center">
                <span className="text-emerald-500 font-bold">λ</span>
                <span className="text-blue-400 font-medium">{currentDir}</span>
                <span className="text-zinc-100">{item.cmd}</span>
              </div>
              <div className="mt-1.5 text-zinc-400 leading-relaxed whitespace-pre-wrap">{item.out}</div>
            </div>
          ))}
          <form onSubmit={handleCommand} className="flex gap-2 items-center">
            <span className="text-emerald-500 font-bold">λ</span>
            <span className="text-blue-400 font-medium">{currentDir}</span>
            <input 
              ref={inputRef}
              autoFocus
              className="bg-transparent outline-none flex-1 text-zinc-100 caret-emerald-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
            />
          </form>
          <div ref={terminalEndRef} />
        </div>
      </div>
      <div className="h-5 bg-emerald-500/5 flex items-center px-3 text-[8px] text-zinc-500 border-t border-emerald-500/10">
        <span>[UP/DOWN] History | [ENTER] Execute | Type 'help' for commands</span>
      </div>
    </div>
  );
};

// --- OS Screen Components ---

const Windows10Screen = () => (
  <div className="w-full h-full bg-[#0078D7] flex flex-col relative overflow-hidden font-sans select-none">
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <div className="text-white text-xl font-light">Updating Windows... 35%</div>
        <div className="text-white/60 text-sm mt-2">Please keep your computer on.</div>
      </div>
    </div>
    <div className="h-10 bg-black/20 backdrop-blur-md flex items-center px-4 gap-4">
      <div className="w-5 h-5 bg-white/20 rounded-sm"></div>
      <div className="flex-1 h-6 bg-white/10 rounded-sm"></div>
      <div className="w-20 h-6 bg-white/10 rounded-sm"></div>
    </div>
  </div>
);

const Tiny10Screen = () => (
  <div className="w-full h-full bg-[#1a1a1a] flex flex-col font-sans overflow-hidden">
    <div className="flex-1 grid grid-cols-2 gap-px bg-white/5">
      <div className="bg-[#004275] flex flex-col items-center justify-center p-4 border-r border-white/10">
        <div className="text-white font-bold text-lg mb-2">Tiny10</div>
        <div className="text-white/60 text-[10px] text-center">Stripped down for performance</div>
        <div className="mt-4 w-12 h-12 border-2 border-white/20 flex items-center justify-center rounded">
          <span className="text-white text-xs">EXE</span>
        </div>
      </div>
      <div className="bg-[#0c0c0c] flex flex-col items-center justify-center p-4">
        <div className="text-emerald-500 font-bold text-lg mb-2">Arch Linux</div>
        <div className="text-emerald-500/60 text-[10px] text-center">The real home</div>
        <div className="mt-4 w-12 h-12 border-2 border-emerald-500/20 flex items-center justify-center rounded">
          <span className="text-emerald-500 text-xs">λ</span>
        </div>
      </div>
    </div>
    <div className="h-8 bg-black flex items-center justify-center text-[10px] text-zinc-500 font-mono">
      GRUB v2.06 Dual Boot Loader
    </div>
  </div>
);

const Windows11Screen = () => (
  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-900 flex flex-col relative overflow-hidden font-sans">
    <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/windows11/800/600')] opacity-30 bg-cover"></div>
    <div className="flex-1 flex items-center justify-center z-10">
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 text-center">
        <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
          <div className="grid grid-cols-2 gap-1 w-6 h-6">
            <div className="bg-white/90"></div><div className="bg-white/90"></div>
            <div className="bg-white/90"></div><div className="bg-white/90"></div>
          </div>
        </div>
        <div className="text-white font-medium">Welcome back, Anish</div>
        <div className="text-white/60 text-xs mt-1">Windows 11 Pro</div>
      </div>
    </div>
    <div className="h-12 bg-white/10 backdrop-blur-2xl flex items-center justify-center px-4 gap-2 border-t border-white/10">
      <div className="flex gap-1">
        {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 bg-white/10 rounded-md hover:bg-white/20 transition-colors"></div>)}
      </div>
    </div>
  </div>
);

const PhoneScreen = () => (
  <div className="w-full h-full bg-black p-4 font-mono text-[10px] text-emerald-500 overflow-hidden flex flex-col">
    <div className="flex justify-between opacity-50 mb-2 border-b border-emerald-500/20 pb-1">
      <span>Termux v0.118</span>
      <span>14:20</span>
    </div>
    <div className="flex-1 overflow-hidden">
      <motion.div
        animate={{ y: [0, -100, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="mb-1">$ pkg update && pkg upgrade</div>
        <div className="mb-1 text-zinc-500">[*] Working...</div>
        <div className="mb-1">$ git clone https://github.com/kali/kali-nethunter</div>
        <div className="mb-1">[*] Cloning into 'kali-nethunter'...</div>
        <div className="mb-1">remote: Enumerating objects: 452, done.</div>
        <div className="mb-1">$ ./install.sh</div>
        <div className="mb-1 text-yellow-500">[!] Warning: Low storage (400MB left)</div>
        <div className="mb-1">$ rm -rf /sdcard/DCIM/Camera/*</div>
        <div className="mb-1 text-emerald-400">[*] Space cleared. Continuing...</div>
        <div className="mb-1">$ start-kali</div>
        <div className="mb-1 text-blue-400">Kali GNU/Linux Rolling 2019.4</div>
        <div className="mb-1">user@kali:~$ _</div>
      </motion.div>
    </div>
    <div className="mt-2 p-2 bg-emerald-500/10 rounded border border-emerald-500/20">
      <div className="flex justify-between text-[8px] mb-1">
        <span>CPU: 84%</span>
        <span>RAM: 3.2/4GB</span>
      </div>
      <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div 
          animate={{ width: ["84%", "92%", "78%"] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-full bg-emerald-500"
        />
      </div>
    </div>
  </div>
);

const JourneySection = ({ 
  year, 
  title, 
  description, 
  device, 
  children, 
  align = 'left',
  customVisual,
  screenContent
}: { 
  year: string, 
  title: string, 
  description: string, 
  device?: 'phone' | 'laptop', 
  children?: React.ReactNode,
  align?: 'left' | 'right',
  customVisual?: React.ReactNode,
  screenContent?: React.ReactNode
}) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center py-24 px-6 relative overflow-hidden">
      <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}>
        <motion.div 
          initial={{ opacity: 0, x: align === 'left' ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className={align === 'right' ? 'lg:order-2' : ''}
        >
          <div className="font-mono text-emerald-500 mb-2 tracking-tighter text-lg">{year}</div>
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight leading-none text-zinc-100">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed mb-8">
            {description}
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            {children}
          </div>
        </motion.div>

        <motion.div className={`relative ${align === 'right' ? 'lg:order-1' : ''} w-full`}>
          {customVisual && customVisual}
          {device && (
            <DeviceFrame type={device} label={title.split(' ')[0]}>
              {screenContent || (
                <div className="w-full h-full bg-[#111] flex flex-col items-center justify-center p-12 text-center">
                  {device === 'phone' ? <Smartphone size={64} className="text-zinc-700 mb-4" /> : <Laptop size={64} className="text-zinc-700 mb-4" />}
                  <div className="font-mono text-xs text-zinc-600 uppercase tracking-widest">System Offline</div>
                </div>
              )}
            </DeviceFrame>
          )}
        </motion.div>
      </div>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative bg-[#0a0a0a] selection:bg-emerald-500/30">
      <VerticalTimeline progress={scrollYProgress} />

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-emerald-500 origin-left z-50" style={{ scaleX }} />

      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-emerald-500/5 blur-[160px] rounded-full"></div>
          <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-500/5 blur-[160px] rounded-full"></div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            Available for AI/ML Projects
          </div>
          <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter text-zinc-100 mb-6">
            ARCH <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">JOURNEY</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            From hacking on a Redmi Note 4 to building LLM architectures. 
            Curiosity-driven engineering with a passion for Linux and Math.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-500">
          <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll to explore</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}><ChevronDown size={20} /></motion.div>
        </motion.div>
      </section>

      <JourneySection 
        year="2019 • High School"
        title="Aimless Arrow"
        description="Just an aimless arrow from a bow. No 5G, no home internet, just a 4GB RAM Redmi Note 4. I learned Linux through Termux, Kali, and VNC."
        device="phone"
        align="left"
        screenContent={<PhoneScreen />}
        customVisual={<motion.div animate={{ y: [0, -20, 0], rotate: [45, 50, 45], x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="absolute -top-20 -right-20 text-emerald-500/20 pointer-events-none"><ArrowRight size={300} strokeWidth={0.5} /></motion.div>}
      >
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Termux</span>
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Kali Linux</span>
      </JourneySection>

      <JourneySection 
        year="2021 • Senior School"
        title="The Choice"
        description="Forced to take Bio/Math but didn't give up on tech. Stepping up to a real keyboard on an old HP laptop running Windows 10."
        device="laptop"
        align="right"
        screenContent={<Windows10Screen />}
      >
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Bio/Math</span>
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Windows 10</span>
      </JourneySection>

      <JourneySection 
        year="2023 • 1st Year"
        title="Pushing Limits"
        description="Used dual boot Tiny10 and Arch Linux on a Lenovo Ideapad. Python became my primary language as the terminal became my home."
        device="laptop"
        align="left"
        screenContent={<Tiny10Screen />}
      >
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Arch Linux</span>
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Tiny10</span>
      </JourneySection>

      <JourneySection 
        year="2025 • 3rd Year"
        title="The Acer Era"
        description="Upgraded to a modern Acer machine. Dual booting Windows 11 with Arch Linux as the primary driver for AI development."
        device="laptop"
        align="right"
        screenContent={<Windows11Screen />}
      >
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Windows 11</span>
        <span className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">Arch Linux</span>
      </JourneySection>

      {/* Final Terminal Section */}
      <section className="min-h-screen py-24 px-6 flex flex-col items-center justify-center bg-black/40">
        <div className="max-w-7xl w-full">
          <div className="mb-12 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-zinc-100 mb-4">The Final <span className="text-emerald-400">Environment</span></h2>
            <p className="text-zinc-400 font-mono text-sm">ARCH LINUX (6.1.0-arch1-1) • TILING WM (SWAY)</p>
          </div>
          <div className="w-full h-[600px] shadow-2xl shadow-emerald-500/5">
            <ArchLinuxOS />
          </div>
        </div>
      </section>

      <footer className="py-24 px-6 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-8 text-zinc-100">Let's build something <span className="text-emerald-400">intelligent</span>.</h2>
          <div className="flex justify-center gap-6 mb-12">
            <a href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors">GitHub</a>
            <a href="#" className="text-zinc-500 hover:text-zinc-100 transition-colors">LinkedIn</a>
          </div>
          <p className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">Built with Arch Linux • 2026</p>
        </div>
      </footer>
    </div>
  );
}


