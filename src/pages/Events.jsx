import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment'; // Ensure moment is imported
import CircleBackground from '../components/CircleBackground/CircleBackground';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:1337/api/events?populate=flyer')
      .then(response => {
        setEvents(response.data.data);
        setFilteredEvents(response.data.data); // Initialize with all events
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
    const now = new Date();
    if (filterType === 'upcoming') {
      setFilteredEvents(events.filter(event => new Date(event.attributes.event_date) > now));
    } else if (filterType === 'past') {
      setFilteredEvents(events.filter(event => new Date(event.attributes.event_date) < now));
    } else {
      setFilteredEvents(events);
    }
  };

  const getImageUrl = (formats) => {
    if (formats.large) return formats.large.url;
    if (formats.medium) return formats.medium.url;
    if (formats.small) return formats.small.url;
    if (formats.thumbnail) return formats.thumbnail.url;
    return null;
  };
  

  return (
    <div className="relative bg-white mb-6 min-h-screen z-1">
      
      <h1 className="text-4xl font-bold text-center mb-2 pt-20 p-3 text-black font-gothic">CODEX CLUB EVENTS AVANT YO</h1>
      <div className="flex justify-center mb-10 z-30">
        {['all', 'upcoming', 'past'].map(f => (
          <button 
            key={f}
            onClick={() => handleFilterChange(f)} 
            className={`px-4 py-2 mx-2 text-black border-2 rounded-full transition duration-300 ${filter === f ? 'bg-black text-white' : 'bg-white hover:bg-black hover:text-white'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)} Events
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-20">
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <motion.div key={event.id}
              className="card bg-gray-100 shadow-lg flex flex-col items-center cursor-pointer relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              <img 
                src={event.attributes.flyer && event.attributes.flyer.data ? `http://localhost:1337${getImageUrl(event.attributes.flyer.data.attributes.formats)}` : 'https://via.placeholder.com/150'}
                alt={event.attributes.Title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
                <p className="text-sm text-orange-500">{moment(event.attributes.event_date).format('ddd, M.D.YYYY')} - {event.attributes.Location}</p>
                <h2 className="text-xl font-bold text-white mb-2">{event.attributes.Title}</h2>
                <p className="text-white">{event.attributes.Artist}</p>
                <Link to={`/events/${event.id}`} className="mt-2 px-4 py-2 border-orange-500 text-orange-500 border-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-300">View Details</Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center w-full">
            <p className="text-2xl font-gothic">There are no {filter} events. Follow us on Instagram or join the newsletter to stay updated.</p>
            {/* Optional form for location and email subscription if necessary */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;