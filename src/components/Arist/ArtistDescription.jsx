const ArtistDescription = ({ artist }) => {
  return (
    <div className="text-center text-gray-600 mb-6">
      <p>{artist.attributes.Description}</p>
      <div className="flex justify-center space-x-4 mt-4">
        {artist.attributes.Instagram && (
          <a href={`https://${artist.attributes.Instagram}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a>
        )}
        {artist.attributes.Bandcamp && (
          <a href={`https://${artist.attributes.Bandcamp}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Bandcamp</a>
        )}
        {artist.attributes.MoreLinks && (
          <a href={`https://${artist.attributes.MoreLinks}`} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">More Links</a>
        )}
      </div>
    </div>
  );
};