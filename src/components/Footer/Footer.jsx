import React from 'react';

function Footer() {
  return (
    <footer className="bg-black text-white text-center p-4">
      <p>Explore more about Codex Collective. Dive into our world of music and art.</p>
      <p>&copy; {new Date().getFullYear()} Codex Collective. All rights reserved.</p>
    </footer>
  );
}

export default Footer;