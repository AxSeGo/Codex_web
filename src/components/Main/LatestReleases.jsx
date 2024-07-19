import React from 'react';
import { Link } from 'react-router-dom';
import OutlineButton from '../Button/OutlineButton';

const LatestReleases = ({ labels }) => {
  const getImageUrl = (images) => {
    if (!images || images.length === 0) return 'https://via.placeholder.com/150';
    const image = images[0]; // Assuming you want the first image
    return image.attributes.url; // Use the URL directly
  };

  return (
    <div className="py-10 px-4 md:px-20 w-full z-10 bg-transparent bg-black">
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-5 mix-blend-difference font-gothic text-center">
        LAST RELEASES
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-20">
        {labels.map(label => (
          <div key={label.id} className="mb-4">
            <div className="block">
              <span className="text-2xl md:text-xl font-bold font-gothic bg-white text-black inline-block mb-1">
                {label.attributes.Artist} ///
              </span>
            </div>
            <div className="block">
              <span className="text-2xl font-bold font-gothic bg-white text-black inline-block">
                {label.attributes.Title}
              </span>
            </div>
            {label.attributes.Image && (
              <img 
                src={`http://localhost:1337${getImageUrl(label.attributes.Image.data)}`} 
                alt={label.attributes.Title} 
                className="w-full h-auto my-4 object-cover rounded-lg"
              />
            )}
            <OutlineButton to={`/label/${label.id}`}>Details</OutlineButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReleases;