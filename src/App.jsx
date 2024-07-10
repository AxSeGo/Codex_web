import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Main from './pages/Main';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Label from './pages/Label';
import About from './pages/About';
import Footer from './components/Footer/Footer';
import LabelDetail from './pages/LabelDetail';
import './index.css';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar /> 
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/main" element={<Main />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetail />} /> 
            <Route path="/label" element={<Label />} />
            <Route path="/label/:id" element={<LabelDetail />} /> 
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;