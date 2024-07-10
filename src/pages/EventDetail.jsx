import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

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
    fetchEvent();
    fetchEvents();
  }, [id]);

  // Fetch list of other events for navigation
  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(`http://localhost:1337/api/events?fields=event_date&sort=event_date`);
      setEvents(data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!event) return <div>Event not found.</div>;

  const imageUrl = event.attributes.flyer.data ? `http://localhost:1337${event.attributes.flyer.data.attributes.url}` : null;

  return (
    <div className="container px-20 p-4 pt-20 bg-white">
      <div className="flex flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2">
          {imageUrl && <img src={imageUrl} alt={event.attributes.Title} className="h-full w-full object-cover" />}
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <h1 className="text-3xl font-bold">{event.attributes.Title}</h1>
          <p className="mt-4"><strong>Date:</strong> {new Date(event.attributes.event_date).toLocaleDateString()}</p>
          <p className="mt-2">{event.attributes.Description}</p>
          <button onClick={() => navigate('/events')} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Back to Events
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold">Other Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((otherEvent) => (
            <Link key={otherEvent.id} to={`/events/${otherEvent.id}`} className="block p-2 hover:bg-gray-200 rounded">
              {new Date(otherEvent.attributes.event_date).toLocaleDateString()}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;