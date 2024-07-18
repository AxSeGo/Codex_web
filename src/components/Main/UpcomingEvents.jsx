import React from 'react';
import { Link } from 'react-router-dom';
import OutlineButton from '../Button/OutlineButton';
const UpcomingEvents = ({ events = [] }) => {
  const now = new Date();
  const upcomingEvents = events.filter(event => new Date(event.attributes.event_date) >= now);
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  const getImageUrl = (formats) => {
    if (formats.large) return formats.large.url;
    if (formats.medium) return formats.medium.url;
    if (formats.small) return formats.small.url;
    if (formats.thumbnail) return formats.thumbnail.url;
    return 'https://via.placeholder.com/150';
  };

  return (
    <div className="hero min-h-screen flex flex-col items-center py-20 px-4 md:px-20 justify-center z-10 bg-transparent ">
      <div className="w-full mx-auto mb-20">
        <h1 className="text-white text-4xl font-bold mb-5 mix-blend-difference font-gothic text-center">UPCOMING EVENTS</h1>

        {nextEvent ? (
          <div className="h-2/3 flex flex-col md:flex-row backdrop-blur-sm border-gray-700 border-2 text-white  shadow-lg p-6 transition duration-500 ease-in-out transform">
            <div className="w-full md:w-1/2 mb-4 md:mb-0 md:mr-4">
              {nextEvent.attributes.flyer?.data && (
                <img 
                  src={`http://localhost:1337${getImageUrl(nextEvent.attributes.flyer.data.attributes.formats)}`} 
                  alt={nextEvent.attributes.Title} 
                  className="w-full h-full object-cover mix-blend-normal"
                />
              )}
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-4">{nextEvent.attributes.Title}</h2>
                <p className="mb-2 text-xl"><strong>Date:</strong> {new Date(nextEvent.attributes.event_date).toLocaleDateString()}</p>
                <p className="mb-4 text-xl"><strong>Location:</strong> {nextEvent.attributes.Location}</p>
                <h3 className="font-bold mb-2 text-xl">Artists:</h3>
                <ul className="list-none mb-4 text-xl">
                  {nextEvent.attributes.Artist.split(',').map((artist, index) => (
                    <li key={index}>{artist.trim()}</li>
                   
                  ))}
                </ul>
                <p className="mt-4 text-xl">{nextEvent.attributes.Description}</p>
              </div>
              <OutlineButton to="/events" className="mt-4">Visit event section</OutlineButton>
            </div>
          </div>
        ) : (
          <div className="text-center text-black">
            <p>We have no upcoming events.</p>
            <p>:(</p>
          </div>
        )}
      </div>

      <div className="w-full mx-auto">
        <h2 className="text-white text-3xl font-bold mb-5 mix-blend-difference font-gothic text-center">Take a Look at Our Last Events</h2>
        <div className="grid md:grid-cols-2 gap-6 mix-blend-difference">
          {events.slice(1, 5).map((event, index) => (
            <Link to={`/events/${event.id}`} key={event.id} className="backdrop-blur-sm hover:backdrop-blur-md border-gray-700 border-2 text-white rounded-lg shadow-lg p-4 transition duration-500 ease-in-out transform hover:scale-105 hover:border-orange-500 hover:text-orange-500">
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
        <div className="text-center mt-10">
          <Link to="/events" className="backdrop-blur-sm hover:backdrop-blur-md border-gray-700 border-2 text-white rounded-lg shadow-lg px-8 py-4 transition duration-500 ease-in-out transform hover:scale-105 hover:text-orange-500 hover:border-orange-500 flex justify-center items-center">
            <p className="text-2xl font-bold">Check All Events</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;