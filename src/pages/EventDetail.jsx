import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1337/api/events/${id}?populate=flyer`);
        setEvent(data.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchEvents = async () => {
      try {
        const { data } = await axios.get(`http://localhost:1337/api/events?populate=flyer&sort=event_date`);
        setEvents(data.data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchArtists = async () => {
      try {
        const { data } = await axios.get('http://localhost:1337/api/artists');
        setArtists(data.data);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchEvent();
    fetchEvents();
    fetchArtists();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found.</div>;

  const imageUrl = event.attributes.flyer.data ? `http://localhost:1337${event.attributes.flyer.data.attributes.url}` : null;

  const getArtistLink = (artistName) => {
    const artist = artists.find(artist => artist.attributes.Name === artistName.trim());
    return artist ? `/artist/${artist.id}` : null;
  };

  return (
    <div className="container mx-auto px-20 py-4 pt-20 bg-white z-10 min-h-screen flex flex-wrap md:flex-nowrap">
      <div className="w-full">
        {imageUrl && <img src={imageUrl} alt={event.attributes.Title} className="h-full w-full object-cover rounded" />}
      </div>
      <div className="w-full md:w-1/2 md:pl-4 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-4">{event.attributes.Title}</h1>
          <p className="mt-4"><strong>Date:</strong> {new Date(event.attributes.event_date).toLocaleDateString()}</p>
          <p className="mt-2"><strong>Location:</strong> {event.attributes.Location}</p>
          <p className="mt-2"><strong>Artists:</strong></p>
          <ul className="list-none pl-0">
            {event.attributes.Artist.split(',').map((artist, index) => {
              const artistLink = getArtistLink(artist);
              return (
                <li key={index} className="mt-1">
                  {artistLink ? (
                    <Link 
                      to={artistLink} 
                      className="text-orange-500 hover:text-black transition duration-300"
                    >
                      {artist.trim()}
                    </Link>
                  ) : (
                    artist.trim()
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mt-4">{event.attributes.Description}</p>
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-4 font-gothic">Other Events</h2>
          <div className="grid grid-cols-1 gap-3">
            {events.length === 0 && <p>No other events found.</p>}
            {events.map((otherEvent) => (
              <Link 
                key={otherEvent.id} 
                to={`/events/${otherEvent.id}`} 
                className="block rounded-full transition duration-300 hover:text-orange-500"
              >
                {`${otherEvent.attributes.Title} // ${new Date(otherEvent.attributes.event_date).toLocaleDateString()}`}
              </Link>
            ))}
          </div>
        </div>
        <div className="self-end mt-4">
          <button 
            onClick={() => navigate('/events')} 
            className="bg-white text-black border-black border-2 rounded-full px-4 py-2 hover:bg-black hover:text-white transition duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;