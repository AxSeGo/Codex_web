import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CircleBackground from '../components/CircleBackground/CircleBackground'; // Asegúrate de que la ruta sea correcta

const Artist = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/api/artists?populate=Avatar')
      .then(response => {
        setArtists(response.data.data);
      })
      .catch(error => {
        console.error('Error fetching artists:', error);
      });
  }, []);

  const baseURL = 'http://localhost:1337';

  const getAvatarUrl = (avatarData) => {
    if (!avatarData || !avatarData.attributes) return 'https://via.placeholder.com/150';
    return baseURL + (avatarData.attributes.formats?.thumbnail?.url || avatarData.attributes.url);
  };

  return (
    <div className="relative bg-white min-h-screen p-10 pt-20">
      <h1 className="text-4xl font-bold text-center text-black mb-10 font-gothic">ARTISTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {artists.map(artist => (
          <div key={artist.id} className="bg-white shadow-lg p-5 flex flex-col items-center mb-5 rounded-lg border transform transition-all duration-300 hover:bg-black hover:text-white hover:shadow-2xl">
            <img src={getAvatarUrl(artist.attributes.Avatar?.data)} alt={artist.attributes.Name} className="w-32 h-32 object-cover rounded-full mb-4" />
            <h2 className="text-xl font-bold mb-4">{artist.attributes.Name}</h2>
            <div className="mt-auto text-center">
              <Link to={`/artist/${artist.id}`} className="bg-black text-white rounded-full p-3 hover:bg-white hover:text-black border-2 border-black transition duration-300">+</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artist;