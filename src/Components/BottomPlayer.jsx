import React from 'react'
import PreviousButton from './PreviousButton'
import PlayPauseButton from './PlayPauseButton'
import NextButton from './NextButton'
import PlayerBar from './PlayerBar'

const BottomPlayer = ({currentPlaylist,selectedSong,setSelectedSong,handleSongEnd,audioControlRef}) => {
  return (
    <div className="fixed bottom-0 left-72 w-full z-40 bg-black">
        <div className="flex space-x-3 relative top-3 bottom-0">
            <div className="flex ">
                <img
                src={currentPlaylist.imageUrl}
                alt={currentPlaylist.name}
                className="w-14 h-14 ml-10 mb-5 px-0 rounded-lg"
                />
                <div className="px-2 mt-3">
                    <div className="text-white mr-24 font-semibold text-sm">
                        {selectedSong || "not playing"}
                    </div>
                    <div className="text-white text-xs opacity-65">Juice WRLD</div>
                </div>
            </div>
            <div className="fixed mt-9 flex left-1/3 space-x-3 px-80 z-40">
                <PreviousButton
                setSelectedSong={setSelectedSong}
                selectedSong={selectedSong}
                songs={currentPlaylist.songs}
                />
                <PlayPauseButton
                audioSrc={`/audio/${selectedSong}.mp3`}
                onSongEnd={handleSongEnd}
                ref={audioControlRef}
                />
                <NextButton
                setSelectedSong={setSelectedSong}
                selectedSong={selectedSong}
                songs={currentPlaylist.songs}
                />
            </div>
        </div>
        <PlayerBar audioRef={audioControlRef.current?.audio} />
      </div>
  )
}

export default BottomPlayer