import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ArtistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [labels, setLabels] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:1337/api/artists/${id}?populate=Avatar`)
      .then(response => {
        setArtist(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching artist details:', error);
      });
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/labels?populate=Image')
      .then(response => {
        setLabels(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching labels:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:1337/api/events?populate=flyer')
      .then(response => {
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  if (!artist) {
    return <div>Loading...</div>;
  }

  const baseURL = 'http://localhost:1337';
  const avatarUrl = artist.attributes.Avatar?.data
    ? baseURL + (artist.attributes.Avatar.data.attributes.formats?.large?.url || artist.attributes.Avatar.data.attributes.url)
    : 'https://via.placeholder.com/150';

  const artistName = artist.attributes.Name;

  const filteredLabels = labels.filter(label => label.attributes.Artist === artistName);
  const filteredEvents = events.filter(event => event.attributes.Artist.includes(artistName));

  return (
    <div className="min-h-screen p-10 pt-20 bg-white">
      <h1 className="text-4xl font-bold text-center text-black mb-10">{artistName}</h1>
      <div className="flex flex-col items-center">
        <img src={avatarUrl} alt={artistName} className="w-64 h-64 object-cover rounded-full mb-6" />
        <p className="text-center text-gray-600 mb-6">{artist.attributes.Description}</p>
        <div className="flex space-x-4 mb-10">
          {artist.attributes.Instagram && (
            <a href={`https://${artist.attributes.Instagram}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          )}
          {artist.attributes.Bandcamp && (
            <a href={`https://${artist.attributes.Bandcamp}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              Bandcamp
            </a>
          )}
          {artist.attributes.MoreLinks && (
            <a href={`https://${artist.attributes.MoreLinks}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
              More Links
            </a>
          )}
        </div>

        {/* Sección de Tapes */}
        <div className="w-full mt-10">
          <h2 className="text-3xl font-bold mb-6">Tapes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredLabels.map(label => (
              <div key={label.id} className="bg-white shadow-lg p-5 mb-5 rounded-lg border">
                <img src={baseURL + label.attributes.Image.data[0].attributes.formats.thumbnail.url} alt={label.attributes.Title} className="w-full h-64 object-cover rounded mb-4" />
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-2">{label.attributes.Title}</h3>
                  <p className="text-gray-600 mb-4">{label.attributes.Description}</p>
                  <a href={label.attributes.Bandcamp} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    Bandcamp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de Events */}
        <div className="w-full mt-10">
          <h2 className="text-3xl font-bold mb-6">Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredEvents.map(event => (
              <div key={event.id} className="bg-white shadow-lg p-5 mb-5 rounded-lg border">
                <img src={baseURL + event.attributes.flyer.data.attributes.formats.thumbnail.url} alt={event.attributes.Title} className="w-full h-64 object-cover rounded mb-4" />
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-2">{event.attributes.Title}</h3>
                  <p className="text-gray-600 mb-4">{event.attributes.Description}</p>
                  <p className="text-gray-600 mb-4">{event.attributes.Location}</p>
                  <p className="text-gray-600 mb-4">{new Date(event.attributes.event_date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botón Back to Artists */}
        <div className="w-full mt-10 text-center">
          <button
            onClick={() => navigate('/artist')}
            className="bg-white text-black border-black border-2 rounded-full px-4 py-2 hover:bg-black hover:text-white transition duration-300"
          >
            Back to Artists
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetail;