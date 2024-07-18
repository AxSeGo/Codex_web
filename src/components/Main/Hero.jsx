import React from 'react';
import './Hero.css'; // Adjust the path based on your project structure

const Hero = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen z-10 bg-gradient-to-b from-white via-zinc-100 to-black relative overflow-hidden mix-blend-difference">
      <div className="absolute inset-0 z-20 bg-noise"></div> {/* Adding noise overlay */}
      <img src="src/assets/icon_.svg" alt="Main Icon" style={{ minWidth: '500px' }} className="z-30 mix" />
    </div>
  );
};

export default Hero;