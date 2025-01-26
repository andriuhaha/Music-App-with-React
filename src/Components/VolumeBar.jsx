import React, { useState } from "react";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa"; // Import mute and unmute icons

const VolumeBar = ({ audioRef }) => {
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false); // Track mute state

  const handleVolumeChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setVolume(newValue);
    if (audioRef?.current) {
      audioRef.current.audio.volume = newValue;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      // Unmute by setting volume to previous value
      if (audioRef?.current) {
        audioRef.current.audio.volume = volume;
      }
    } else {
      // Mute by setting volume to 0
      if (audioRef?.current) {
        audioRef.current.audio.volume = 0;
      }
    }
    setIsMuted(!isMuted); // Toggle mute state
  };

  return (
    <div className="relative">
      <div className="absolute ml-96 mt-2 flex items-center space-x-3"> {/* Mute button and volume slider */}
        {/* Mute Button */}
        <button onClick={toggleMute} className="text-white">
          {isMuted ? (
            <FaVolumeMute size={20} /> // Mute icon
          ) : (
            <FaVolumeUp size={20} /> // Unmute icon
          )}
        </button>

        {/* Volume Slider */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume} // Show 0 when muted, otherwise the volume
          onChange={handleVolumeChange}
          className="slider"
        />
      </div>

      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          width: 96px;
          height: 4px;
          background: #ddd;
          border-radius: 5px;
          outline: none;
          transition: background 0.3s;
          cursor: pointer;
        }

        /* Style the thumb (the circle you drag) */
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          background: pink; /* Green color for thumb */
          border-radius: 50%;
          cursor: pointer;
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #4CAF50; /* Green color for thumb */
          border-radius: 50%;
          cursor: pointer;
        }

        /* Hover effect for the track */
        .slider:hover {
          background: gray; /* Darker background on hover */
        }
      `}</style>
    </div>
  );
};

export default VolumeBar;
