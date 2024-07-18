const ArtistAvatar = ({ avatarUrl, artistName }) => {
    return (
      <div className='h-screen flex items-center justify-center'>
        <img src={avatarUrl} alt={artistName} className="w-full md:w-1/2 h-auto object-cover rounded-full mt-5 mb-10" />
      </div>
    );
  };