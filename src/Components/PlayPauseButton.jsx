import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa'; // Import play and pause icons

const PlayPauseButton = ({ audioSrc }) => {
  const audioRef = useRef(null); // Reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false); // Track play state

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };


  return (
    <div className="play-pause-container">
      {/* Audio element */}
      <audio ref={audioRef} src={audioSrc} />

      {/* Play/Pause button */}
      <button onClick={togglePlayPause} className="text-3xl bg-white rounded-full p-2">
        {isPlaying ? <FaPause size={15} color="black" /> : <FaPlay size={15} color="black" />}
      </button>
    </div>
  );
};

export default PlayPauseButton;
