import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CircleBackground from '../components/CircleBackground/CircleBackground';
import OutlineButton from '../components/Button/OutlineButton';

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [labels, setLabels] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1337/api/artists/${id}?populate=Avatar`);
        setArtist(data.data);
      } catch (error) {
        console.error('Error fetching artist details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/labels?populate=Image')
      .then(response => setLabels(response.data.data))
      .catch(error => console.error('Error fetching labels:', error));
  }, []);

  useEffect(() => {
    axios.get('http://localhost:1337/api/events?populate=flyer')
      .then(response => setEvents(response.data.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!artist) return <div>Artist not found.</div>;

  const baseURL = 'http://localhost:1337';
  const avatarUrl = artist.attributes.Avatar?.data
    ? baseURL + (artist.attributes.Avatar.data.attributes.formats?.large?.url || artist.attributes.Avatar.data.attributes.url)
    : 'https://via.placeholder.com/150';
  const artistName = artist.attributes.Name;
  const filteredLabels = labels.filter(label => label.attributes.Artist === artistName);
  const filteredEvents = events.filter(event => event.attributes.Artist.includes(artistName));

  return (
    <motion.div 
      className="relative bg-black overflow-hidden min-h-screen"
      initial={{ opacity: 0, filter: 'blur(10px)', backgroundColor: 'black' }}
      animate={{ opacity: 1, filter: 'blur(0)', backgroundColor: 'black' }}
      transition={{ duration: 1 }}
    >
      {/* Circle Background always below the content */}
      <CircleBackground />
      
      {/* Avatar section */}
      <div className="relative h-screen flex items-center justify-center z-10 bg-gradient-to-t from-black to-transparent">
        <img src={avatarUrl} alt={artistName} className="w-4/5 md:w-1/2 h-auto object-cover rounded-full mt-5 pb-10" />
      </div>

      {/* Artist Name, Description, and Links */}
      <div className="relative z-20 text-white bg-black py-10 px-4 md:px-10 flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row justify-center items-start md:items-center w-full">
          <div className="md:w-1/3 w-full mb-4 md:mb-0">
            <h1 className="text-6xl font-bold font-gothic md:text-left">{artistName}</h1>
          </div>
          <div className="md:w-2/3 w-full text-left md:pl-8">
            <p className="mb-4">{artist.attributes.Description}</p>
            <div className="flex flex-col space-y-2 mt-4 md:mt-0">
              {artist.attributes.Instagram && (
                <a href={`https://${artist.attributes.Instagram}`} className="text-orange-500 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Instagram</a>
              )}
              {artist.attributes.Bandcamp && (
                <a href={`https://${artist.attributes.Bandcamp}`} className="text-orange-500 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">Bandcamp</a>
              )}
              {artist.attributes.MoreLinks && (
                <a href={`https://${artist.attributes.MoreLinks}`} className="text-orange-500 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">More Links</a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <div className="relative z-20 w-full px-4 md:px-10 bg-gradient-to-b from-black to-transparent mt-0">
        <h2 className="text-6xl font-bold mb-6 text-white font-gothic text-center">Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredEvents.map(event => (
            <div key={event.id} className="shadow-lg p-5 mb-5 rounded-lg border border-gray-800 backdrop-blur-sm relative">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="text-left text-white">
                    <h3 className="text-xl font-bold mb-2">{event.attributes.Title}</h3>
                  </div>
                </div>
                <div className="text-left text-white mt-4">
                  <p className="mb-2">{event.attributes.Location}</p>
                  <p className="mb-4">{new Date(event.attributes.event_date).toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric', year: 'numeric' }).replace(',', '')}</p>
                </div>
                <button 
                  className="absolute top-2 right-2 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition duration-300"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tapes Section */}
      <div className="relative z-20 w-full mt-10 px-4 md:px-10 pt-10">
        <h2 className="text-6xl font-gothic text-white mb-6 text-center">Tapes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredLabels.map(label => (
            <div key={label.id} className="shadow-lg p-5 mb-5 rounded-lg border border-gray-800 backdrop-blur-sm relative">
              <img src={baseURL + (label.attributes.Image.data[0].attributes.formats.large?.url || label.attributes.Image.data[0].attributes.formats.medium?.url || label.attributes.Image.data[0].attributes.formats.thumbnail.url)} alt={label.attributes.Title} className="w-full h-64 object-cover rounded mb-4" />
              <div className="text-left text-white">
                <h3 className="text-xl font-bold mb-2">{label.attributes.Title}</h3>
              </div>
              <button 
                className="absolute top-2 right-2 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-white hover:text-orange-500 transition duration-300"
                onClick={() => navigate(`/label/${label.id}`)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Back to Artists Button */}
      <div className="relative z-20 w-full my-10 text-center">
        <OutlineButton to="/artist" className="mt-4">Back to Artists</OutlineButton>
      </div>
    </motion.div>
  );
};

export default ArtistDetail;