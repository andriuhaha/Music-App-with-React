import React from "react";
import AddSongButton from "./AddSongButton";
import AudioPlayer from "./AudioPlayer";
import PlayPauseButton from "./PlayPauseButton";

const SongList = ({ songs , setSelectedSong }) => {
  // Helper function to format duration in seconds to MM:SS
  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="song-list">
      <ul className="">
        {songs.map((song) => (
          <li onClick={
            ()=>setSelectedSong(song.title)
          } key={song.id} className="cursor-pointer p-4 hover:bg-[#1f1f1f] hover:bg-opacity-80 rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">{song.title}</h3>
              <p className="text-sm text-gray-400">{song.artist}</p>
            </div>
            <div className="text-sm text-gray-400 mr-">
              {formatDuration(song.durationInSeconds)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongList;
