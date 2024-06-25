import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/events?populate=flyer');
        const data = await response.json();
        setEvents(data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-screen-lg">
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events.map(event => (
              <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {event.attributes.flyer && event.attributes.flyer.data && (
                  <img
                    src={`http://localhost:1337${event.attributes.flyer.data.attributes.formats?.medium?.url || event.attributes.flyer.data.attributes.url}`}
                    alt={event.attributes.Title}
                    className="w-full h-64 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-2">{event.attributes.Title}</h2>
                  <p className="text-gray-600 mb-2">{new Date(event.attributes.event_date).toLocaleDateString()}</p>
                  <p className="text-gray-700">{event.attributes.Description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;