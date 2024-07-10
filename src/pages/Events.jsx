import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/events?populate=flyer')
      .then(response => {
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const getImageUrl = (formats) => {
    if (formats.large) return formats.large.url;
    if (formats.medium) return formats.medium.url;
    if (formats.small) return formats.small.url;
    if (formats.thumbnail) return formats.thumbnail.url;
    return null;
  };

  return (
    <div className="bg-white">
      <h1 className="text-4xl font-bold text-center mb-10 pt-20 p-3 text-black font-gothic">All Events - Present and Past</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-20">
        {events.map(event => (
          <motion.div key={event.id}
            className="card bg-gray-100 shadow-lg p-5 flex flex-col items-center cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <img 
              src={event.attributes.flyer && event.attributes.flyer.data ? `http://localhost:1337${getImageUrl(event.attributes.flyer.data.attributes.formats)}` : 'https://via.placeholder.com/150'}
              alt={event.attributes.Title} 
              className="w-full h-48 object-cover mb-5"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
              <h2 className="text-xl font-bold text-white mb-2 text-center">{event.attributes.Title}</h2>
              <p className="text-white">{new Date(event.attributes.event_date).toLocaleDateString()}</p>
              <p className="text-white mb-2">{event.attributes.Description}</p>
              <Link to={`/events/${event.id}`} className="mt-2 bg-white text-black rounded px-4 py-2">View Details</Link>            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Events;