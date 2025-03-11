import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, Github, Instagram, Linkedin, Mail } from 'lucide-react';
import XIcon from './XIcon';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | JSX.Element>('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const commands: Record<string, JSX.Element> = {
    whoami: (
      <div className="space-y-2">
        <h1 className="text-4xl font-mono font-bold text-white mb-2">Hi there!</h1>
        <h2 className="text-2xl font-mono text-gray-300 mb-4">I'm Anish K M</h2>
        <p className="text-gray-400">AI & DS Undergrad • AI Developer • Research Freak</p>
        <p className="text-gray-400">Based in Chennai, India</p>
      </div>
    ),
    'cd interest': (
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 hover:text-white transition-colors">AI Modelling and Architecture</span>
            <span className="text-gray-600 opacity-50">•</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 hover:text-white transition-colors">Web Development, DevOps, MLops</span>
            <span className="text-gray-600 opacity-50">•</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 hover:text-white transition-colors">ML/DL/NN/Algorithms</span>
            <span className="text-gray-600 opacity-50">•</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 hover:text-white transition-colors">py,c,cpp,torch,java,git,etc...</span>
            <span className="text-gray-600 opacity-50">•</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 hover:text-white transition-colors">Linux freak</span>
          </div>
        </div>
      </div>
    ),
    help: (
      <div className="space-y-2">
        <p className="text-gray-300">Available commands:</p>
        <ul className="list-disc list-inside text-gray-400">
          <li>whoami - Display personal info</li>
          <li>cd interest - Show skills and interests</li>
          <li>help - Show this help message</li>
          <li>clear - Clear the terminal</li>
        </ul>
      </div>
    ),
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (trimmedCmd === 'clear') {
      setOutput('');
      return;
    }
    
    const result = commands[trimmedCmd];
    if (result) {
      setOutput(result);
    } else {
      setOutput(<span className="text-red-400">Command not found. Type 'help' for available commands.</span>);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setHistory(prev => [...prev, input]);
    setHistoryIndex(-1);
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    handleCommand('whoami');
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div 
        className="w-full max-w-3xl bg-black/80 backdrop-blur-sm rounded-lg border border-gray-800 overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(64, 64, 64, 0.15) 0%, rgba(0, 0, 0, 0.8) 50%)`
        }}
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border-b border-gray-800">
          <TerminalIcon size={16} className="text-gray-500" />
          <span className="text-sm text-gray-500 font-mono">terminal</span>
        </div>
        <div className="p-6 font-mono">
          <div className="space-y-4">
            {output && <div className="mb-4">{output}</div>}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-gray-500">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-white outline-none font-mono"
                autoFocus
                spellCheck="false"
              />
            </form>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6">
            <a href="https://github.com/AnishKMBtech" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.instagram.com/anishkm___/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.linkedin.com/in/anish-k-m-273670319/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/AnishKM1384309?t=adfm6Ds7Dxu9JV6TQcFJyg&s=08" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-white transition-colors">
              <XIcon size={20} />
            </a>
            <a href="mailto:anishbtechaiads@gmail.com" className="text-gray-600 hover:text-white transition-colors">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;