import React from 'react';
import { FaStepForward } from 'react-icons/fa'; // Import the next button icon

const NextButton = ({ setSelectedSong, selectedSong, songs }) => {
  const goNext = () => {
    // Find the current song index
    const currentSongIndex = songs.findIndex((song) => song.title === selectedSong);

    // Check if there is a next song
    if (currentSongIndex < songs.length - 1) {
      // Move to the next song in the array
      setSelectedSong(songs[currentSongIndex + 1].title);
    }
  };

  return (
    <button onClick={goNext} className="text-3xl bg-black rounded-full p-2">
      <FaStepForward size={17} color="gray" />
    </button>
  );
};

export default NextButton;
