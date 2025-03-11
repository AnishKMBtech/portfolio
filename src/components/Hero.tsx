import React from 'react';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-6 animate-fade-in">
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">Your Name</span>
        </h1>
        <p className="text-2xl text-white/80 mb-8 animate-fade-in-delay">
          Full Stack Developer & Designer
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="#projects"
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white rounded-full hover:opacity-90 transition-opacity"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="px-8 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;