import React from 'react';

const AudioPlayer = ({filePath}) => {
  if (!filePath) {
    return <p>No audio file provided.</p>;
  }

  return (
    <div className="audio-player">
      <audio controls>
        <source src="/audio/Paranoia.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPlayer;
