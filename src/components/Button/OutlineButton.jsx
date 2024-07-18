import React from 'react';
import { Link } from 'react-router-dom';

const OutlineButton = ({ to, children }) => {
  return (
    <Link to={to} className="inline-block mt-2 px-4 py-2 text-white border-white border-2 rounded-full hover:text-black hover:bg-white transition duration-300">
      {children}
    </Link>
  );
};

export default OutlineButton;