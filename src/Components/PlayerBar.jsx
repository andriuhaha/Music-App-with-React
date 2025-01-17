import React, { useEffect, useState } from "react";

const PlayerBar = ({ audioRef }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);

  useEffect(() => {
    console.log(audioRef);
    if (audioRef) {
      console.log("Audio is available");
      setIsAudioAvailable(true);

      const handleLoadedMetadata = () => {
        setDuration(audioRef.duration);
      };

      const handleTimeUpdate = () => {
        setCurrentTime(audioRef.currentTime);
      };

      audioRef.addEventListener("loadedmetadata", handleLoadedMetadata);
      audioRef.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        audioRef.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audioRef.removeEventListener("timeupdate", handleTimeUpdate);
      };
    } else {
      console.log("Audio is not available");
      setIsAudioAvailable(false);
    }
  }, [audioRef]); // React to changes in audioRef directly

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleSeek = (e) => {
    if (audioRef) {
      const newTime = (e.target.value / 100) * duration;
      audioRef.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    isAudioAvailable && (
      <div className="flex bg-black z-50">
        <style>
        {`
          .range-input {
            appearance: none; /* Remove default styles */
            width: 33%;
            height: 4px;
            background: #e0e0e0;
            border-radius: 8px;
          }
          
          .range-input:hover {
            background: #ffccd5;
          }

          .range-input::-webkit-slider-thumb {
            -webkit-appearance: none;
            opacity: 0; /* Hide thumb */
            height: 12px;
            width: 12px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
            transition: opacity 0.3s ease;
          }

          .range-input:hover::-webkit-slider-thumb {
            opacity: 1; /* Show thumb on hover */
          }

          .range-input::-moz-range-thumb {
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .range-input:hover::-moz-range-thumb {
            opacity: 1;
          }
        `}
      </style>
        <div className="text-white text-sm mt-2 ml-96 px-1">{formatTime(currentTime)}</div>
        <input
          type="range"
          min="0"
          max="100"
          value={(currentTime / duration) * 100 || 0}
          onChange={handleSeek}
          className="range-input mt-4 w-full h-1 bg-gray-300 hover:bg-pink-200 rounded-lg appearance-none"
        />
        <div className="text-white text-sm mt-2 px-1">{formatTime(duration)}</div>
      </div>
    )
  );
};

export default PlayerBar;
