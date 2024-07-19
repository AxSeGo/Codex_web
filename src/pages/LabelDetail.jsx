import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import OutlineButton from '../components/Button/OutlineButton'; // Ensure the correct path to the component

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
    <div className="mx-auto py-10 px-4 md:px-20 pt-20 flex flex-wrap md:flex-nowrap items-start bg-black text-white min-h-screen">
      <div className="w-full md:w-1/2">
        <img src={imageUrl} alt={label.attributes.Title} className="w-full object-cover" />
      </div>
      <div className="w-full mt-3 md:mt-0 md:w-1/2 md:pl-4">
        <h1 className="text-4xl font-gothic bg-white text-black inline-block px-2 my-1">{label.attributes.Artist}</h1>
        <span className="text-4xl font-gothic mx-1"> /// </span>
        <h1 className="text-4xl font-gothic bg-white text-black inline-block px-2 my-1">{label.attributes.Title}</h1>
        <p className="mt-4 text-lg">{label.attributes.Description}</p>

        {label.attributes.Bandcamp && (
          <div className="mt-8">
            <h2 className="text-2xl font-gothic mb-4">Listen on Bandcamp</h2>
            <iframe 
              style={{ border: 0, width: '100%', height: '120px' }} 
              src="https://bandcamp.com/EmbeddedPlayer/album=2613296696/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=small/transparent=true/" 
              seamless
            >
              <a href={label.attributes.Bandcamp} target="_blank" rel="noopener noreferrer" className="text-white hover:text-orange-500 mt-2 block">
                Listen on Bandcamp
              </a>
            </iframe>
          </div>
        )}

        {artist && (
          <div className="mt-8">
            <h2 className="text-2xl font-gothic mb-4">Artist</h2>
            <div className="flex items-center">
              <img src={artistAvatarUrl} alt={artist.attributes.Name} className="w-16 h-16 object-cover rounded-full mr-4" />
              <Link to={`/artist/${artist.id}`} className="text-2xl text-white hover:text-orange-500 transition duration-300">
                {artist.attributes.Name}
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8">

          <OutlineButton to="/label" className="ml-4">All tapes</OutlineButton>
        </div>
      </div>
    </div>
  );
};

export default LabelDetail;