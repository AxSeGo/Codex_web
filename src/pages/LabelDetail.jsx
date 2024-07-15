import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const LabelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [label, setLabel] = useState(null);
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabel = async () => {
      try {
        const labelResponse = await axios.get(`http://localhost:1337/api/labels/${id}?populate=Image`);
        setLabel(labelResponse.data.data);

        const artistName = labelResponse.data.data.attributes.Artist;
        const artistResponse = await axios.get(`http://localhost:1337/api/artists?filters[Name][$eq]=${artistName}&populate=Avatar`);
        if (artistResponse.data.data.length > 0) {
          setArtist(artistResponse.data.data[0]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching label details:', error);
        setLoading(false);
      }
    };

    fetchLabel();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!label) return <div>Label not found.</div>;

  const baseURL = 'http://localhost:1337';
  const imageUrl = label.attributes.Image && label.attributes.Image.data.length > 0
    ? `${baseURL}${label.attributes.Image.data[0].attributes.url}`
    : 'https://via.placeholder.com/150';

  const artistAvatarUrl = artist && artist.attributes.Avatar?.data
    ? baseURL + (artist.attributes.Avatar.data.attributes.formats?.thumbnail?.url || artist.attributes.Avatar.data.attributes.url)
    : 'https://via.placeholder.com/150';

  return (
    <div className="container mx-auto p-4 pt-20 flex flex-wrap md:flex-nowrap items-start z-10">
      <div className="w-full md:w-1/2">
        <img src={imageUrl} alt={label.attributes.Title} className="w-full object-cover rounded" />
      </div>
      <div className="w-full md:w-1/2 md:pl-4">
        <h1 className="text-4xl font-bold">{label.attributes.Title}</h1>
        <p className="mt-4 text-lg">{label.attributes.Description}</p>
        {label.attributes.Bandcamp && (
          <a href={label.attributes.Bandcamp} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 mt-2 block">
            Listen on Bandcamp
          </a>
        )}

        {artist && (
          <div className="mt-4 flex items-center">
            <img src={artistAvatarUrl} alt={artist.attributes.Name} className="w-16 h-16 object-cover rounded-full mr-4" />
            <Link to={`/artist/${artist.id}`} className="text-2xl text-blue-500 hover:text-blue-700">
              {artist.attributes.Name}
            </Link>
          </div>
        )}

        <button onClick={() => navigate(-1)} className="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300">
          Back to Labels
        </button>
      </div>
    </div>
  );
};

export default LabelDetail;