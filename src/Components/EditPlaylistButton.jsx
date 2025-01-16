import React from 'react'
import { useState } from 'react';
import EditPlaylistPopup from './EditPlaylistPopup';

const EditPlaylistButton = ({playlistInUse}) => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);

    // Toggle popup visibility
    const togglePopup = () => {
      setIsPopupVisible(!isPopupVisible);
    };
  
    return (
      <div className='mt-2'>
        <button onClick={togglePopup} className='bg-black bg-opacity-40 text-white text-sm font-bold p-3 rounded-3xl
         transform transition-transform duration-200 hover:scale-105'>
          Edit playlist
        </button>
        <EditPlaylistPopup isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} existingPlaylist={playlistInUse} />
      </div>
    );
}

export default EditPlaylistButton