import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaWhatsapp, FaLink } from 'react-icons/fa';

const EventDetailModal = ({ event, onClose }) => {
  const imageUrl = event.attributes.flyer.data ? `http://localhost:1337${event.attributes.flyer.data.attributes.url}` : null;

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = `Check out this event: ${event.attributes.Title}`;

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${text} ${url}`, '_blank');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-75 flex items-center justify-center transition-opacity duration-300">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-4 rounded-lg shadow-lg relative mb-5 animate-modalShow">
        <button onClick={onClose} className="absolute top-2 right-2 text-black hover:text-red-600 transition duration-300">
          X
        </button>
        <div className="flex flex-col md:flex-row">
          {imageUrl && (
            <div className="w-full md:w-1/2 p-2 flex justify-center items-center">
              <img src={imageUrl} alt={event.attributes.Title} className="w-full h-auto max-h-96 object-contain rounded" />
            </div>
          )}
          <div className="w-full md:w-1/2 p-2">
            <h1 className="text-3xl font-bold mb-4">{event.attributes.Title}</h1>
            <p className="mt-4"><strong>Date:</strong> {moment(event.attributes.event_date).format('MMM D, YYYY')}</p>
            <p className="mt-2"><strong>Location:</strong> {event.attributes.Location}</p>
            <p className="mt-2"><strong>Artists:</strong></p>
            <ul className="list-none pl-0">
              {event.attributes.Artist.split(',').map((artist, index) => (
                <li key={index} className="mt-1">
                  <Link to={`/artist/${artist.trim()}`} className="text-orange-500 hover:text-black transition duration-300">
                    {artist.trim()}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4">{event.attributes.Description}</p>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <button 
            onClick={onClose} 
            className="bg-white text-black border-black border-2 rounded-full px-4 py-2 hover:bg-black hover:text-white transition duration-300"
          >
            Back to Events
          </button>
          <div className="flex space-x-2">
            <button onClick={() => handleShare('whatsapp')} className="text-black hover:text-orange-500 transition duration-300">
              <FaWhatsapp size={24} />
            </button>
            <button onClick={() => handleShare('copy')} className="text-black hover:text-orange-500 transition duration-300">
              <FaLink size={24} />
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-modalShow {
          animation: modalShow 0.5s ease-out;
        }

        @keyframes modalShow {
          0% {
            opacity: 0;
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default EventDetailModal;