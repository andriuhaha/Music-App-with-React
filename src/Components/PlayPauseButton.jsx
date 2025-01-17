import React, { useRef, useState, useEffect, forwardRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const PlayPauseButton = React.forwardRef(({ audioSrc, onSongEnd }, ref) => {
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

  useEffect(() => {
    if (ref) {
      // Provide both full audioRef and play/pause methods
      ref.current = {
        audio: audioRef.current, // Full audio element
        play: () => {
          audioRef.current.play();
          setIsPlaying(true);
        },
        pause: () => {
          audioRef.current.pause();
          setIsPlaying(false);
        },
      };
    }
  }, [ref]);

  useEffect(() => {
    const handleSongEnd = () => {
      setIsPlaying(false);
      if (onSongEnd) {
        onSongEnd();
      }
    };

    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener("ended", handleSongEnd);
    }

    return () => {
      if (audioElement) {
        audioElement.removeEventListener("ended", handleSongEnd);
      }
    };
  }, [onSongEnd]);

  return (
    <div className="play-pause-container">
      {audioSrc !== "" && <audio ref={audioRef} src={audioSrc} />}
      <button onClick={togglePlayPause} className="text-3xl bg-white hover:bg-gray-300 rounded-full p-2">
        {isPlaying ? <FaPause size={15} color="black" /> : <FaPlay size={15} color="black" />}
      </button>
    </div>
  );
});

export default PlayPauseButton;
