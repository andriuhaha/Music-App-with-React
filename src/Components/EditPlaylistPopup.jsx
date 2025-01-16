import React, { useState } from "react";

const EditPlaylistPopup = ({ isVisible, setIsVisible, existingPlaylist }) => {
  const [playlistDetails, setPlaylistDetails] = useState({
    name: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaylistDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleEditPlaylist = async () => {
    const updatedPlaylist = {
      id: existingPlaylist.id, // Use the existing playlist ID
      name: playlistDetails.name || existingPlaylist.name, // Use the current name if input is empty
      imageUrl: playlistDetails.imageUrl || existingPlaylist.imageUrl, // Use the current image URL if input is empty
      songs: [],
    };

    try {
      const response = await fetch(`http://localhost:5045/api/Playlists/${existingPlaylist.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPlaylist),
      });

      if (response.ok) {
        console.log("Playlist updated successfully!");
        setIsVisible(false); // Close the popup after successful update
        window.location.reload();
      } else {
        console.error("Failed to update playlist:", await response.text());
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      setIsVisible(false); // Close popup
    }
  };

  return (
    <div>
      {isVisible && (
        <div
          className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div
            className="bg-black text-gray-200 rounded-3xl p-6 w-3/12 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-4">Edit Playlist</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                name="name"
                placeholder={`Playlist name`}
                value={playlistDetails.name}
                onChange={handleInputChange}
                className="p-2 rounded-3xl bg-[#1f1f1f] text-white focus:outline-none"
              />
              <input
                type="text"
                name="imageUrl"
                placeholder={`Image URL`}
                value={playlistDetails.imageUrl}
                onChange={handleInputChange}
                className="p-2 rounded-3xl bg-[#1f1f1f] text-white focus:outline-none"
              />
              <button
                onClick={handleEditPlaylist}
                className="bg-[#C9A9A6] hover:bg-[#F3CFC6] text-white font-bold py-2 rounded-3xl transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPlaylistPopup;
