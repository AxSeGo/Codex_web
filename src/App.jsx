// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Main from './pages/Main';
import Events from './pages/Events';
import Label from './pages/Label';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-600 p-4 text-white">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-300">Main</Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-gray-300">Events</Link>
            </li>
            <li>
              <Link to="/label" className="hover:text-gray-300">Label</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-300">About</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/events" element={<Events />} />
          <Route path="/label" element={<Label />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;