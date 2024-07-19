import React from 'react';
import { Link } from 'react-router-dom';

const OutlineButton = ({ to, children }) => {
  return (
    <Link to={to} className="inline-block mt-2 px-4 py-2 text-white border-gray-400 border-2 rounded-full  hover:border-white hover:border-3 hover:shadow-black ransition duration-300">
      {children}
    </Link>
  );
};

export default OutlineButton;