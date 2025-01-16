import React from 'react';
import { FaStepBackward } from 'react-icons/fa'; // Import the previous button icon

const PreviousButton = ({ setSelectedSong, selectedSong, songs }) => {
  const goBack = () => {
    // Find the current song index
    const currentSongIndex = songs.findIndex((song) => song.title === selectedSong);

    // Check if there is a previous song
    if (currentSongIndex > 0) {
      // Move to the previous song in the array
      setSelectedSong(songs[currentSongIndex - 1].title);
    }
  };

  return (
    <button onClick={goBack} className="text-3xl bg-black rounded-full p-2">
      <FaStepBackward size={17} color="gray" />
    </button>
  );
};

export default PreviousButton;
