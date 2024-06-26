const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const url = `http://localhost:1337/api/events/${id}?populate=flyer`;
      console.log("Fetching event details from URL:", url); // Log the URL
      axios.get(url)
        .then(response => {
          setEvent(response.data.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching event details:', error);
          setLoading(false);
        });
    }, [id]);
  
    if (loading) return <div>Loading...</div>;
    if (!event) return <div>Event not found.</div>;
  
    const imageUrl = event.attributes.flyer.data ? `http://localhost:1337${event.attributes.flyer.data.attributes.url}` : null;
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">{event.attributes.Title}</h1>
        {imageUrl && (
          <img src={imageUrl} alt={event.attributes.Title} className="w-full mt-4" />
        )}
        <p className="mt-4"><strong>Date:</strong> {new Date(event.attributes.event_date).toLocaleDateString()}</p>
        <p className="mt-2">{event.attributes.Description}</p>
      </div>
    );
  };
  
  export default EventDetail;