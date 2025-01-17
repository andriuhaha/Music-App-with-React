import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import SongList from "../Components/SongList";
import AddSongButton from "../Components/AddSongButton";
import EditPlaylistButton from "../Components/EditPlaylistButton";
import PlayPauseButton from "../Components/PlayPauseButton";
import NextButton from "../Components/NextButton";
import PreviousButton from "../Components/PreviousButton";
import PlayerBar from "../Components/PlayerBar";
import BottomPlayer from "../Components/BottomPlayer";

const PlaylistPage = () => {
  const { id } = useParams();
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState("");
  const audioControlRef = useRef(null); // Ref for controlling audio playback

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await fetch(`http://localhost:5045/api/Playlists/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch the playlist");
        }
        const data = await response.json();
        setCurrentPlaylist(data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylist();
  }, [id]);

  const handleSongEnd = () => {
    const currentIndex = currentPlaylist.songs.findIndex(song => song.title === selectedSong);
    if (currentIndex < currentPlaylist.songs.length - 1) {
      setSelectedSong(currentPlaylist.songs[currentIndex + 1].title);
    } else {
      setSelectedSong(currentPlaylist.songs[0].title);
    }
  };

  useEffect(() => {
    // Play the new song when `selectedSong` changes
    if (audioControlRef.current) {
      audioControlRef.current.play();
    }
  }, [selectedSong]);

  if (loading) return <p>Loading...</p>;
  if (!currentPlaylist) return <p>Playlist not found</p>;

  return (
    <div className="playlist-page h-screen overflow-hidden">
      <div className="bg-black bg-opacity-50 flex w-1/3 rounded-xl m-7">
        <img
          src={currentPlaylist.imageUrl}
          alt={currentPlaylist.name}
          className="w-48 h-48 ml-10 mt-5 mb-5 object-cover rounded-lg"
        />
        <div className="flex flex-col mt-20 px-4">
          <div className="font-bold text-white text-3xl">{currentPlaylist.name}</div>
          <div className="text-base text-white font-semibold opacity-50">{currentPlaylist.songs.length} songs</div>
          <div className="flex space-x-2">
            <AddSongButton />
            <EditPlaylistButton playlistInUse={currentPlaylist} />
          </div>
        </div>
      </div>
      <SongList songs={currentPlaylist.songs} setSelectedSong={setSelectedSong} />
      <BottomPlayer currentPlaylist={currentPlaylist} selectedSong={selectedSong} 
        setSelectedSong={setSelectedSong} handleSongEnd={handleSongEnd} 
        audioControlRef={audioControlRef} 
        />
    </div>
  );
};

export default PlaylistPage;
