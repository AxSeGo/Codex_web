import React from 'react';
import { Link } from 'react-router-dom';

const LatestReleases = ({ labels }) => {
  const getImageUrl = (images) => {
    if (!images || images.length === 0) return 'https://via.placeholder.com/150';
    const image = images[0]; // Assuming you want the first image
    return image.attributes.url; // Use the URL directly
  };

  return (
    <div className="p-20  mx-auto w-full z-10 bg-transparent bg-black">
      <h2 className="text-2xl font-bold mb-5 font-gothic">Label Section - Latest Releases</h2>
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
  );
};

export default LatestReleases;