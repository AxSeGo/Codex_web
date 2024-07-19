import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setMessage('Thank you for subscribing to our newsletter!');
      // Simulate sending email
      setTimeout(() => {
        setEmail('');
        setMessage('');
      }, 3000);
    } else {
      setMessage('Please enter a valid email address.');
    }
  };

  return (
    <motion.div
      className="h-screen py-20 px-4 md:px-20 flex flex-col items-center justify-center text-center w-full z-10 bg-gradient-to-b from-transparent to-black mix-blend-normal"
      initial={{ filter: 'blur(10px)' }}
      whileInView={{ filter: 'blur(0px)' }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-6xl font-gothic glitch flicker">Join Our Newsletter</h1>
      <p className="text-2xl font-gothic leading-relaxed mx-auto mt-4 text-gray-300">
        Join our newsletter to keep updated about events or new releases!
      </p>
      <div className="mt-10">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Your Email"
            className="p-4 text-black rounded-md border-2 border-white"
          />
          <button
            type="submit"
            className="p-4 ml-2 bg-white text-black rounded-md border-2 border-white hover:bg-black hover:text-white transition duration-300"
          >
            Send
          </button>
        </form>
        {message && (
          <p className="mt-4 text-xl font-gothic text-gray-300">{message}</p>
        )}
      </div>
    </motion.div>
  );
};

export default Newsletter;