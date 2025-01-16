import React, { useState } from 'react';
import AddSongPopup from './AddSongPopup';

const AddSongButton = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Toggle popup visibility
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className='mt-2'>
      <button onClick={togglePopup} className='bg-black bg-opacity-40 text-white text-sm font-bold p-3 rounded-3xl
       transform transition-transform duration-200 hover:scale-105'>
        Add Song
      </button>
      <AddSongPopup isVisible={isPopupVisible} setIsVisible={setIsPopupVisible} />
    </div>
  );
};

export default AddSongButton;
