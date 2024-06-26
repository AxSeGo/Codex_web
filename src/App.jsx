// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Main from './pages/Main';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail'; // Import the EventDetail component
import Label from './pages/Label';
import About from './pages/About';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar /> 
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<EventDetail />} />
            <Route path="/label" element={<Label />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;