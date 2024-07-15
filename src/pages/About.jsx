import React from 'react';

const About = () => {
  return (
    <div className="relative flex items-center justify-center h-screen bg-black text-white font-gothic overflow-hidden">
      <div className="text-center z-0 space-y-4">
        <h1 className="text-4xl">About Codex</h1>
        <p className="px-10">
          Codex is an avant-garde collective rooted in the artistic underground, exploring the interconnections of technology, art, and culture. With a dynamic community of artists, technologists, and thinkers, we challenge conventions and create transformative experiences.
        </p>
        <div>
          <a href="#instagram" className="text-lg underline hover:text-orange-500">Instagram</a> | 
          <a href="#ra" className="text-lg underline hover:text-orange-500">Resident Advisor</a> | 
          <a href="#bandcamp" className="text-lg underline hover:text-orange-500">Bandcamp</a> | 
          <a href="#radio" className="text-lg underline hover:text-orange-500">Radio</a>
        </div>
      </div>
    </div>
  );
};

export default About;