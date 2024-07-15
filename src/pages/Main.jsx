// src/pages/Main.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CircleBackground from '../components/CircleBackground/CircleBackground'; // Ensure the correct path to the component

const Main = () => {
  const [events, setEvents] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/events')
      .then(response => {
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

    axios.get('http://localhost:1337/api/labels?populate=Image') // Fetch labels with images
      .then(response => {
        setLabels(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching labels:', error);
      });
  }, []);

  const getImageUrl = (images) => {
    if (!images || images.length === 0) return 'https://via.placeholder.com/150';
    const image = images[0]; // Assuming you want the first image
    return image.attributes.url; // Use the URL directly
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden relative bg-black text-white">
      <CircleBackground />
      <div className="flex justify-center items-center w-full h-screen z-10 bg-white">
        <img src="src/assets/iconmain.png" alt="Main Icon" style={{ maxWidth: '500px' }} />
      </div>

      <div className="hero min-h-screen flex items-center py-20 justify-center z-10 bg-white mix-blend-difference">
        <div className="sticky top-0 p-20 w-full mx-auto">
          <h1 className="text-black text-4xl font-bold mb-5 mix-blend-difference font-gothic text-center">UPCOMING EVENTS</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map(event => (
        <Link to={`/events/${event.id}`} key={event.id} className="bg-white border-black border-4 text-black rounded-lg shadow-lg p-4 transition duration-500 ease-in-out transform hover:scale-105 hover:bg-black hover:text-white">
          <div className="flex flex-col justify-between">
            <h2 className="text-2xl font-bold mb-2">{event.attributes.Title}</h2>
            <div className="flex justify-between">
              <p>{new Date(event.attributes.event_date).toLocaleDateString()}</p>
              <p>{event.attributes.Location}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
        </div>
      </div>

      <div className="sticky top-0 p-20 border-t-8 border-black mx-auto w-full z-10 bg-transparent mix-blend-difference min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-6xl font-gothic mb-5">Who We Are</h2>
          <p className="text-2xl font-gothic leading-relaxed mx-auto">
            "Soundscapes merge, dreams collide,<br />
            Emotions flare, hearts open wide.<br />
            A canvas of noise, a touch of the bizarre,<br />
            In the night's embrace, we heal and scar.<br />
            Beats drop, spirits soar,<br />
            In this space, we are something more.<br />
            A fusion of weird, a symphony of pain,<br />
            Where the lost dance, and the seekers gain.<br />
            This is Codex, the echo of our cries,<br />
            A place for the soul's surprise."
          </p>
        </div>
      </div>

      <motion.div
        className="w-60vw mx-auto text-center my-20 w-full z-10 bg-transparent mix-blend-difference bg-black"
        initial={{ filter: 'blur(10px)' }}
        whileInView={{ filter: 'blur(0px)' }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-6xl font-gothic glitch flicker">Join Our Newsletter</h1>
        <p className="text-2xl font-gothic leading-relaxed mx-auto mt-4">
          Join our newsletter to keep updated about events or new releases!
        </p>
        <div className="mt-10">
          <input
            type="email"
            placeholder="Your Email"
            className="p-4 text-black rounded-md border-2 border-white"
          />
          <button className="p-4 ml-2 bg-white text-black rounded-md border-2 border-white hover:bg-black hover:text-white transition duration-300">
            Send
          </button>
        </div>
      </motion.div>

      <div className="p-20 border-t-8 border-black mx-auto w-full z-10 bg-transparent mix-blend-difference">
        <h2 className="text-2xl font-bold mb-5 font">Label Section - Latest Releases</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20">
          {labels.map(label => (
            <div key={label.id} className="mb-4">
              <h3 className="text-xl font-bold font-gothic">{label.attributes.Title}</h3>
              {label.attributes.Image && (
                <img 
                  src={`http://localhost:1337${getImageUrl(label.attributes.Image.data)}`} 
                  alt={label.attributes.Title} 
                  className="w-full h-auto my-4 object-cover rounded-lg"
                />
              )}
              <p>{label.attributes.Description}</p>
              <Link to={`/label/${label.id}`} className="inline-block mt-4 px-4 py-2 text-white border-white border-2 rounded-full hover:text-black hover:bg-white transition duration-300">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;