import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-3xl font-bold mix-blend-difference text-white">
        CODEX
      </h1>
      <ul className="flex space-x-4">
        {['Main', 'Events', 'Label', 'About'].map((item) => (
          <li key={item} className="relative hover:underline-animation">
            <Link to={`/${item.toLowerCase()}`} className="text-xl mix-blend-difference text-white hover:text-gray-300">
              {item}
            </Link>
            <div className="underline"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;