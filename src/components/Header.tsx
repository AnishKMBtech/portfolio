import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-white">Portfolio</div>
          <div className="flex items-center space-x-6">
            <a href="#about" className="text-white hover:text-pink-400 transition-colors">About</a>
            <a href="#projects" className="text-white hover:text-pink-400 transition-colors">Projects</a>
            <a href="#contact" className="text-white hover:text-pink-400 transition-colors">Contact</a>
            <div className="flex items-center space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="mailto:your.email@example.com" className="text-white hover:text-pink-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;