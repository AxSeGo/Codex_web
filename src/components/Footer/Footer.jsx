import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaSpotify, FaVolumeUp } from 'react-icons/fa';

function Footer() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/events?_sort=event_date:desc&_limit=3')
      .then(response => {
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const socialIcons = [
    { name: 'Facebook', icon: FaFacebook, link: 'https://www.facebook.com' },
    { name: 'Instagram', icon: FaInstagram, link: 'https://www.instagram.com' },
    { name: 'Spotify', icon: FaSpotify, link: 'https://www.spotify.com' },
    { name: 'Speaker', icon: FaVolumeUp, link: 'https://www.speakerwebsite.com' },
  ];

  return (
    <footer className="bg-black text-white  px-5 lg:px-20 relative flex flex-col md:flex-row justify-between items-start md:items-center">
      <div className="w-full md:w-1/3">
        <img src="/src/assets/iconmain.png" alt="Codex Icon" className="h-16 w-16 mb-4 mix-blend-difference" />
      </div>
      <div className="w-full md:w-1/3 mt-10 md:mt-0">
        <h3 className="text-lg font-bold mb-4">Sections</h3>
        <ul>
          <li><Link to="/main" className="hover:text-gray-400">Main</Link></li>
          <li><Link to="/events" className="hover:text-gray-400">Events</Link></li>
          <li><Link to="/label" className="hover:text-gray-400">Label</Link></li>
          <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
        </ul>
      </div>
      <div className="w-full md:w-1/3 mt-10 md:mt-0">
        <h3 className="text-lg font-bold mb-4">Last Events</h3>
        <ul>
          {events.map(event => (
            <li key={event.id}><Link to={`/events/${event.id}`} className="hover:text-gray-400">{event.attributes.Title}</Link></li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-1/3 mt-10 md:mt-0">
        <h3 className="text-lg font-bold mb-4">Follow Us</h3>
        <div className="flex space-x-4">
          {socialIcons.map(icon => (
            <motion.a
              key={icon.name}
              href={icon.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              className="text-white hover:text-gray-400"
            >
              {React.createElement(icon.icon, { size: 24 })}
            </motion.a>
          ))}
        </div>
        <p className="mt-4 text-sm">Stay connected with us for the latest updates and releases.</p>
        <p>&copy; {new Date().getFullYear()} Codex Collective. All rights reserved.</p>

      </div>
    </footer>
  );
}

export default Footer;