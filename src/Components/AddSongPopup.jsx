import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddSongPopup = ({isVisible,setIsVisible}) => {
  const { id } = useParams();
  const [songDetails, setSongDetails] = useState({
    title: '',
    filepath: '',
    artist: '',
    duration: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddSong = async () => {
    const newSong = {
      title: songDetails.title,
      artist: songDetails.artist || 'Unknown Artist',
      durationInSeconds: parseInt(songDetails.duration, 10) || 0,
      filePath: songDetails.filepath,
      playlistId: id,
    };

    try {
      const response = await fetch('http://localhost:5045/api/Songs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSong),
      });

      if (response.ok) {
        console.log('Song added successfully:', await response.json());
      } else {
        console.error('Failed to add song. Response:', await response.text());
      }
    } catch (error) {
      console.error('Error posting song:', error);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      setIsVisible(false); // Close popup
    }
  };

  return (
    <div>
      {isVisible && (
               <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
               onClick={handleOutsideClick}
               >
               <div className="bg-black text-gray-200 rounded-3xl p-6 w-3/12 h- shadow-lg"
               onClick={(e) => e.stopPropagation()}
               >
                 <h2 className="text-lg font-bold mb-4">Add Song</h2>
                 <div className="flex flex-col space-y-4">
                   <input
                     type="text"
                     name="title"
                     placeholder="Song Title"
                     value={songDetails.title}
                     onChange={handleInputChange}
                     className="p-2 rounded-3xl bg-[#1f1f1f] text-white focus:outline-none"
                   />
                   <input
                     type="text"
                     name="filepath"
                     placeholder="e.g. file:///C:/Desktop/unreleased/Song.mp3"
                     value={songDetails.filepath}
                     onChange={handleInputChange}
                     className="p-2 rounded-3xl bg-[#1f1f1f] text-white focus:outline-none"
                   />
                   <input
                     type="text"
                     name="artist"
                     placeholder="Artist"
                     value={songDetails.artist}
                     onChange={handleInputChange}
                     className="p-2 rounded-3xl bg-[#1f1f1f] text-white focus:outline-none"
                   />
                   <input
                     type="number"
                     name="duration"
                     placeholder="Duration (seconds)"
                     value={songDetails.duration}
                     onChange={handleInputChange}
                     className="p-2 rounded-3xl bg-[#1f1f1f] text-white focus:outline-none"
                   />
                   <button
                     onClick={handleAddSong}
                     className="bg-[#C9A9A6] hover:bg-[#F3CFC6] text-white font-bold py-2 rounded-3xl transition"
                   >
                     Confirm
                   </button>
                 </div>
               </div>
             </div>
            )}
    </div>
  );
};

export default AddSongPopup;
