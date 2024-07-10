import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Label = () => {
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/labels?populate=imagen') // Correctly populate the image field
      .then(response => {
        console.log(response.data); // Log to check the structure
        setLabels(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching labels:', error);
      });
  }, []);

  const baseURL = 'http://localhost:1337'; // Ensure this is the correct base URL

  const getImageUrl = (label) => {
    // Correct handling of the image URL based on the expected response structure
    const imageUrl = label.attributes.imagen?.data?.attributes?.url || 'https://via.placeholder.com/150';
    return `${baseURL}${imageUrl}`;
  };

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-3xl font-bold text-center mb-5" style={{ fontFamily: "Times New Roman", color: "#4A2C2A" }}>Label Items</h1>
      {labels.map(label => (
        <div key={label.id} className="flex flex-col md:flex-row justify-center items-center my-5 bg-cream p-5 rounded shadow-lg">
          <img src={getImageUrl(label)} alt={label.attributes.Title} className="w-full md:w-1/2 object-cover rounded"/>
          <div className="md:ml-5 text-center md:text-left">
            <h2 className="text-xl font-bold" style={{ fontFamily: "Garamond", color: "#3E2723" }}>{label.attributes.Title}</h2>
            <p style={{ fontFamily: "Palatino", color: "#3E2723" }}>{label.attributes.Description}</p>
            <Link to={`/label/${label.id}`} className="mt-2 bg-maroon-600 hover:bg-maroon-800 text-white font-bold py-2 px-4 rounded transition duration-300">View More</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Label;