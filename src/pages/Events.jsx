import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  // Helper function to get the best available image format
  const getImageUrl = (formats) => {
    if (formats.large) return formats.large.url;
    if (formats.medium) return formats.medium.url;
    if (formats.small) return formats.small.url;
    if (formats.thumbnail) return formats.thumbnail.url;
    return null; // Return null if no formats are available
  };

  return (
    <div className="container mx-auto my-10">
      <h1 className="text-4xl font-bold text-center mb-10">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {events.map(event => (
          <div key={event.id} className="card bg-gray-100 shadow-lg p-5 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-2 text-center">{event.attributes.Title}</h2>
            {event.attributes.flyer && event.attributes.flyer.data && getImageUrl(event.attributes.flyer.data.attributes.formats) ? (
              <img 
                src={`http://localhost:1337${getImageUrl(event.attributes.flyer.data.attributes.formats)}`} 
                alt={event.attributes.Title} 
                className="w-full h-48 object-cover mb-5"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center mb-5">
                <span className="text-gray-700">No Image Available</span>
              </div>
            )}
            <p className="text-gray-700 mb-2">{new Date(event.attributes.event_date).toLocaleDateString()}</p>
            <p className="text-gray-600 text-center">{event.attributes.Description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;