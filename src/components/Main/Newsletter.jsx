import React from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  return (
    <motion.div
      className="h-screen mx-auto flex flex-col items-center justify-center text-center w-full z-10 bg-transparent"
      initial={{ filter: 'blur(10px)' }}
      whileInView={{ filter: 'blur(0px)' }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-6xl font-gothic glitch flicker">Join Our Newsletter</h1>
      <p className="text-2xl font-gothic leading-relaxed mx-auto mt-4">
        Join our newsletter to keep updated about events or new releases!
      </p>
      <div className="mt-10">
        <input
          type="email"
          placeholder="Your Email"
          className="p-4 text-black rounded-md border-2 border-white"
        />
        <button className="p-4 ml-2 bg-white text-black rounded-md border-2 border-white hover:bg-black hover:text-white transition duration-300">
          Send
        </button>
      </div>
    </motion.div>
  );
};

export default Newsletter;