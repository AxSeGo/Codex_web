import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.svg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 }
  };

  const handleNavClick = (item) => {
    console.log(`${item} clicked`);
    setIsOpen(false);
  };

  

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-5 lg:px-20 pt-3 flex justify-between items-center bg-black md:bg-transparent md:mix-blend-difference py-2 ">
         <Link to="/">
        <img src={logo} alt="CODEX" className="h-7 md:h-10" />
        </Link>

      <div className="hidden lg:flex space-x-4">
        {['Main', 'Events', 'Label', 'Artist', 'About'].map((item) => (
          <li key={item} className="relative group list-none">
            <Link to={`/${item.toLowerCase()}`} className="text-xl text-white font-gothic" onClick={() => handleNavClick(item)}>
              {item.toUpperCase()}
            </Link>
            <div className="absolute inset-0 flex items-center justify-center text-custom-orange font-normal text-2xl opacity-0 group-hover:opacity-100"
                 style={{ pointerEvents: 'none' }}>
              {item.toUpperCase()}
            </div>
          </li>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden z-40">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl" style={{ mixBlendMode: 'difference' }}>
          {isOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black flex flex-col items-center justify-center"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'tween', duration: 0.5 }}
          >
            <div className="text-center space-y-10">
              {['Main', 'Events', 'Label', 'Artist', 'About'].map((item) => (
                <motion.div key={item} whileHover={{ scale: 1 }} whileTap={{ scale: 0.9 }}>
                  <Link to={`/${item.toLowerCase()}`} className="text-3xl font-gothic text-white" onClick={() => handleNavClick(item)}>
                    {item.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
              <div className="text-1xl text-white mt-10">
                <Link to="/instagram" className="mx-4">INSTAGRAM</Link>
                <Link to="/residentadvisor" className="mx-4">RESIDENT ADVISOR</Link>
                <Link to="/bandcamp" className="mx-4">BANDCAMP</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;