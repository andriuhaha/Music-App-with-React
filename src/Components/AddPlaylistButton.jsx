import React from 'react';

const AddPlaylistButton = ({ addPlaylist }) => {
  return (
    <button
      className="w-7 h-7 font-bold text-2xl text-white ml-36 mb-7 bg-black hover:bg-[#383838] rounded-full flex items-center justify-center"
      onClick={addPlaylist} // Call the passed function when the button is clicked
    >
      +
    </button>
  );
};

export default AddPlaylistButton;
