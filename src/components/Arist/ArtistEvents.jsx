const ArtistEvents = ({ events, baseURL }) => {
  return (
    <div className="w-full mt-10">
      <h2 className="text-3xl font-bold mb-6">Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {events.map(event => (
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
  );
};