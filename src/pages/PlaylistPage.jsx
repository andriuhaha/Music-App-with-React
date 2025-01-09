import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistPage = () => {
  const { id } = useParams(); // Playlist ID from the URL
  const [file, setFile] = useState(null); // Store the selected file
  const [songDetails, setSongDetails] = useState({
    title: '',
    artist: '',
    duration: '',
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the selected file
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddSong = async () => {
    if (!file) {
      alert('Please select a file.');
      return;
    }
  
    try {
      const newSong = {
        title: songDetails.title || file.name, // Default to file name if title is not provided
        artist: songDetails.artist || 'Unknown Artist',
        durationInSeconds: parseInt(songDetails.duration, 10) || 0,
        filePath: file.path, // Use absolute path from the file input
        playlistId: id,
      };
  
      const response = await fetch('http://localhost:5045/api/Songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });
  
      if (response.ok) {
        console.log('Song added successfully:', await response.json());
        alert('Song added successfully!');
      } else {
        console.log(file.path);
        console.error('Failed to add song. Response:', await response.text());
      }
    } catch (error) {
      console.error('Error posting song:', error);
    }
  };
  

  return (
    <div className="playlist-page">
      <h1>Playlist {id}</h1>
      <div>
        <input type="file" accept="audio/*" onChange={handleFileChange} />
        <input
          type="text"
          name="title"
          placeholder="Song Title"
          value={songDetails.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="artist"
          placeholder="Artist"
          value={songDetails.artist}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (seconds)"
          value={songDetails.duration}
          onChange={handleInputChange}
        />
        <button onClick={handleAddSong}>Add Song</button>
      </div>
    </div>
  );
};

export default PlaylistPage;
