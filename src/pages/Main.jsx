import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Ensure this import is included for routing
import './styles.css'; // Ensure your CSS path is correct

const Main = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from API
    axios.get('http://localhost:1337/api/events')
      .then(response => {
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative bg-black text-white">
      {/* Background elements */}
      <div className="fixed inset-0 flex items-center justify-center z-0">
        <div className="galaxy-circle"></div> {/* Make sure this has styles to be visible */}
        <div className="inner-glow"></div> {/* Ensure this has visible styles */}
      </div>

      {/* Centered main icon */}
      <div className="flex justify-center items-center w-full h-screen z-10 bg-white mix-blend-difference">
        <img src="src/assets/iconmain.png" alt="Main Icon" style={{ maxWidth: '500px' }} />
      </div>

      {/* Upcoming Events Section */}
      <div className="hero h-screen flex items-center justify-center z-10 bg-transparent mix-blend-difference">
        <div className="sticky top-0 p-10 w-full mx-auto">
          <h1 className="text-black text-4xl font-bold mb-5 mix-blend-difference">UPCOMING EVENTS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <Link to={`/events/${event.id}`} key={event.id} className="border-gray-900 border-4 text-gray-900 rounded-lg shadow-lg p-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:bg-black hover:text-white">
                <div className="p-4 rounded-lg">
                  <h2 className="text-2xl font-bold">{event.attributes.Title}</h2>
                  <p>{new Date(event.attributes.event_date).toLocaleDateString()}</p>
                  <p>{event.attributes.Description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="sticky top-0 p-10 border-t-8 border-black mx-auto w-full z-10 bg-transparent mix-blend-difference min-h-screen">
        <h2 className="text-2xl font-bold mb-5">Additional Information</h2>
        <p>This is a sample text for additional information below the events section.</p>
      </div>

      {/* Poetic Section */}
      <div className="w-60vw mx-auto text-center my-20 w-full z-10 bg-transparent mix-blend-difference">
        <h1 className="text-6xl font-gothic animate-fadeInUp">Poetry in Motion</h1>
      </div>

      {/* Label Section */}
      <div className="p-10 border-t-8 border-black mx-auto w-full z-10 bg-transparent mix-blend-difference">
        <h2 className="text-2xl font-bold mb-5">Label Section</h2>
        <p>This is a sample text for the label section below the poetic text.</p>
      </div>
    </div>
  );
};

export default Main;