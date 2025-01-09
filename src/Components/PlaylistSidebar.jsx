import React, { useState, useEffect } from 'react';
import PlaylistCard from './PlaylistCard';
import AddPlaylistButton from './AddPlaylistButton';

const PlaylistSidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch playlists when the component mounts
  const fetchPlaylists = async () => {
    try {
      const response = await fetch('http://localhost:5045/api/Playlists');
      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error('Error fetching playlists:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []); // This will run once when the component mounts

  // Function to add a new playlist
  const addPlaylist = async () => {
    const playlistName = `My Playlist`;
    const newPlaylist = {
      name: playlistName,
      imageUrl: 'https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2?v=v2', // Placeholder image URL
      songs: [],
    };

    try {
      // API call to add a new playlist
      const response = await fetch('http://localhost:5045/api/Playlists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlaylist),
      });

      if (response.ok) {
        console.log(`Playlist "${playlistName}" added successfully.`);
        // Fetch the updated list of playlists
        fetchPlaylists(); // Now it works because fetchPlaylists is defined in the component scope
      } else {
        console.error('Failed to add playlist:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding playlist:', error);
    }
  };

  if (loading) {
    return <div className="text-white font-bold text-center">Loading Playlists...</div>;
  }

  return (
    <div className="w-72 p-4 bg-gray-950 h-screen overflow-y-auto scrollbar-thin scrollbar-thumb-[#383838] hover:scrollbar-thumb-gray-500 scrollbar-track-black">
      <div className="flex">
        <h2 className="text-xl font-bold text-white mb-6">Playlists</h2>
        <AddPlaylistButton addPlaylist={addPlaylist} /> {/* Pass the addPlaylist function as prop */}
      </div>
      <div className="space-y-4">
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            imageUrl={playlist.imageUrl || 'unknown'} // Ensure there's a default image if no URL
          />
        ))}
      </div>
    </div>
  );
};

export default PlaylistSidebar;
