import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CircleBackground from '../components/CircleBackground/CircleBackground'; // Ensure the correct path to the component

const Label = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/labels?populate=Image') // Ensure all related data is populated
      .then(response => {
        console.log(response.data); // Log to check the structure
        setLabels(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching labels:', error);
      });
  }, []);

  const baseURL = 'http://localhost:1337'; // Adjust this as needed

  // Function to extract the image URL
  const getImageUrl = (images) => {
    if (!images || images.length === 0) return 'https://via.placeholder.com/150';
    const image = images[0]; // Assuming you want the first image
    const formats = image.attributes.formats;
    if (formats.large) return formats.large.url;
    if (formats.medium) return formats.medium.url;
    if (formats.small) return formats.small.url;
    if (formats.thumbnail) return formats.thumbnail.url;
    return image.attributes.url; // Fallback to the original image URL

  };

  return (
    <div className="bg-white">
      <h1 className="text-4xl font-bold text-center mb-10 pt-20 p-3 text-black font-gothic">Label Items</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-20">
        {labels.map(label => (
          <motion.div key={label.id}
            className="card bg-gray-100 shadow-lg p-5 flex flex-col items-center cursor-pointer relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            <img 
              src={label.attributes.Image ? `${baseURL}${getImageUrl(label.attributes.Image.data)}` : 'https://via.placeholder.com/150'}
              alt={label.attributes.Title} 
              className="w-full h-48 object-cover mb-5"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 p-4">
              <h2 className="text-xl font-bold text-white mb-2 text-center">{label.attributes.Title}</h2>
              <p className="text-white mb-2">{label.attributes.Description}</p>
              <Link to={`/label/${label.id}`} className="mt-2 bg-white text-black rounded px-4 py-2">View More</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Label;