import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import moment from 'moment';
import '../components/Main/Hero.css';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null); // To keep track of which card is hovered on mobile

  useEffect(() => {
    axios.get('http://localhost:1337/api/events?populate=flyer')
      .then(response => {
        const sortedEvents = response.data.data.sort((a, b) => new Date(b.attributes.event_date) - new Date(a.attributes.event_date));
        setEvents(sortedEvents);
        setFilteredEvents(sortedEvents); // Initialize with all events
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

  const groupEventsByMonth = (events) => {
    return events.reduce((groups, event) => {
      const month = moment(event.attributes.event_date).format('MMMM YYYY');
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(event);
      return groups;
    }, {});
  };

  const groupedEvents = groupEventsByMonth(filteredEvents);

  return (
    <div className="relative bg-black text-white pb-6 min-h-screen z-1 py-20 px-4 md:px-20">
      <div className="absolute inset-0 z-0 bg-noise"></div> {/* Adding noise overlay */}
      
      <h1 className="text-4xl font-bold text-center mb-2 pt-20 p-3 font-gothic">CODEX CLUB EVENTS AVANT YO</h1>
      <div className="flex justify-center mb-10 z-10">
        {['all', 'upcoming', 'past'].map(f => (
          <button 
            key={f}
            onClick={() => handleFilterChange(f)} 
            className={`px-4 py-2 mx-2 border-2 rounded-full transition duration-300 ${filter === f ? 'bg-white text-black' : 'bg-black text-white hover:bg-white hover:text-black'}`}>
            {f.charAt(0).toUpperCase() + f.slice(1)} Events
          </button>
        ))}
      </div>
      <div className="z-10">
        {Object.keys(groupedEvents).length > 0 ? (
          Object.keys(groupedEvents).map(month => (
            <div key={month} className="mb-10">
              <h2 className="text-3xl font-gothic border-b-2 border-white mb-4 sticky top-0 bg-black z-20">{month.toUpperCase()}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {groupedEvents[month].map(event => (
                  <motion.div 
                    key={event.id}
                    className="card p-3 border-2 border-gray-700 shadow-lg flex flex-col items-center cursor-pointer relative overflow-hidden"
                    whileTap={{ scale: 0.95 }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    onTapStart={() => setHoveredCard(event.id)} // Trigger hover effect on tap start
                    onHoverStart={() => setHoveredCard(event.id)} // Trigger hover effect on hover start
                    onHoverEnd={() => setHoveredCard(null)} // Remove hover effect on hover end
                  >
                    <img 
                      src={event.attributes.flyer && event.attributes.flyer.data ? `http://localhost:1337${getImageUrl(event.attributes.flyer.data.attributes.formats)}` : 'https://via.placeholder.com/150'}
                      alt={event.attributes.Title} 
                      className="w-full h-full object-cover"
                    />
                    <motion.div 
                      className="absolute p-5 inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center opacity-0"
                      animate={{ opacity: hoveredCard === event.id ? 1 : 0 }} // Animate opacity based on hovered state
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-orange-500">{moment(event.attributes.event_date).format('ddd, D.M.YYYY')} - {event.attributes.Location}</p>
                      <h2 className="text-xl font-bold text-white mb-2">{event.attributes.Title}</h2>
                      <p className="text-white">{event.attributes.Artist}</p>
                      <Link to={`/events/${event.id}`} className="mt-2 px-4 py-2 border-orange-500 text-orange-500 border-2 rounded-full hover:bg-orange-500 hover:text-white transition duration-300">View Details</Link>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
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