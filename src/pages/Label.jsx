import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircleBackground from '../components/CircleBackground/CircleBackground'; // Ensure the correct path to the component

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
    <div className="relative bg-white min-h-screen p-10 pt-20 ">
      <h1 className="text-4xl font-bold text-center text-black mb-10 font-gothic">LABEL ITEMS</h1>
      <div className="grid grid-cols-1 gap-10">
        {labels.map(label => (
          <div key={label.id} className="bg-white shadow-lg p-5 flex flex-col md:flex-row items-center mb-5 rounded-lg border">
            <img src={getImageUrl(label.attributes.Image?.data)} alt={label.attributes.Title} className="w-full md:w-1/4 h-auto object-cover rounded-md" />
            <div className="flex flex-col md:pl-4 w-full">
              <h2 className="text-xl font-bold text-black mt-4 md:mt-0">{label.attributes.Artist} - {label.attributes.Title}</h2>
              <p className="text-gray-600 my-2">{label.attributes.Description}</p>
              <div className="mt-auto text-right">
                <Link to={`/label/${label.id}`} className="bg-black text-white rounded px-4 py-2 hover:bg-gray-800 transition duration-300">View More</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Label;