import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar flex justify-between items-center px-5 lg:px-20 pt-3 fixed top-0 left-0 right-0 z-50" style={{ mixBlendMode: 'difference' }}>
      <h1 className="text-3xl font-bold text-white font-gothic">
        CODEX
      </h1>
      <ul className="flex space-x-4">
        {['Main', 'Events', 'Label', 'About'].map((item) => (
          <li key={item} className="relative group">
            <Link to={`/${item.toLowerCase()}`} className="text-xl text-white font-gothic">
              {item}
            </Link>
            <div className="absolute inset-0 flex items-center justify-center text-custom-orange font-glory text-2xl opacity-0 group-hover:opacity-100"
                 style={{ mixBlendMode: 'difference', pointerEvents: 'none' }}>
              {item}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;