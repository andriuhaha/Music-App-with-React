import React from 'react';
import { Link } from 'react-router-dom';

const PlaylistCard = ({ id, name, imageUrl }) => {
  const defaultImage = 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2';

  return (
    <Link to={`/playlist/${id}`} className="block">
      <div className="flex flex-col items-center p-4 bg-gray-930 rounded-lg shadow-md hover:bg-[#1f1f1f] transition-shadow">
        <img
          src={imageUrl || defaultImage}
          alt={name}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <h3 className="mt-4 text-lg font-semibold font-roboto text-white text-center">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default PlaylistCard;
