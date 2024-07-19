import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import OutlineButton from '../components/Button/OutlineButton';

const Label = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/labels?populate=Image')
      .then(response => {
        setLabels(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching labels:', error);
      });
  }, []);

  const baseURL = 'http://localhost:1337';

  const getImageUrl = (imageData) => {
    if (!imageData || imageData.length === 0) return 'https://via.placeholder.com/150';
    const image = imageData[0];
    return baseURL + (image.attributes.formats?.large?.url || image.attributes.url);
  };

  return (
    <div className="relative bg-black text-white min-h-screen p-4 md:p-20 pt-20">
      <h1 className="text-4xl font-bold text-center mb-10 font-gothic">LABEL ITEMS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {labels.map(label => (
          <motion.div 
            key={label.id} 
            className="shadow-lg p-5 border-gray-700 border-2 backdrop-brightness-50 flex flex-col md:flex-row"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-shrink-0 w-full md:w-1/2 p-4">
              <img 
                src={getImageUrl(label.attributes.Image?.data)} 
                alt={label.attributes.Title} 
                className="w-full h-full object-cover"
                style={{ aspectRatio: 1 }}
              />
            </div>
            <div className="flex flex-col w-full p-4 justify-between">
              <h2 className="text-xl font-bold mb-2">
                <span className="bg-white text-black inline-block px-2 my-1 font-gothic">{label.attributes.Artist}</span>
                <span> /// </span>
                <span className="bg-white text-black inline-block px-2 my-1 font-gothic">{label.attributes.Title}</span>
              </h2>
              <p className="text-gray-400 font-bold mb-4 overflow-hidden overflow-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical' }}>{label.attributes.Description}</p>
              <div className="mt-auto">
                <OutlineButton to={`/label/${label.id}`}>View More</OutlineButton>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Label;