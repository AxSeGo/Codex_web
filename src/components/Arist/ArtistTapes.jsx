const ArtistTapes = ({ labels, baseURL }) => {
    return (
      <div className="w-full mt-10">
        <h2 className="text-3xl font-bold mb-6">Tapes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {labels.map(label => (
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
    );
  };