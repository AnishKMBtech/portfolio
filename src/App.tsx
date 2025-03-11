import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import Ribbons from './components/Ribbons';
import Terminal from './components/Terminal';

function App() {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <Ribbons />
      <Terminal />
    </div>
  );
}

export default App;