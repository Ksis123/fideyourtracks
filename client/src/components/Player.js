import React, { useEffect, useState } from "react";
import "./Player.css"

import { useSelector, useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetCurrentTime,
  SetIsPlaying,
} from "../redux/userSlice";

function Player() {
  const [volume, setVolume] = useState(0.5);
  const [shuffleOn, setShuffleOn] = useState(false);
  const dispatch = useDispatch();
  const audioRef = React.createRef();
  const { currentSong, currentSongIndex, allSongs, isPlaying, currentTime } =
    useSelector((state) => state.user);

  const onPlay = () => {
    audioRef.current.play();
    dispatch(SetIsPlaying(true));
  };

  const onPause = () => {
    audioRef.current.pause();
    dispatch(SetIsPlaying(false));
  };

  const onPrev = () => {
    if (currentSongIndex !== 0 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex - 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex - 1]));
    } else {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(SetCurrentSong(allSongs[randomIndex]));
    }
  };
  const onNext = () => {
    if (currentSongIndex !== allSongs.length - 1 && !shuffleOn) {
      dispatch(SetCurrentSongIndex(currentSongIndex + 1));
      dispatch(SetCurrentSong(allSongs[currentSongIndex + 1]));
    } else {
      const randomIndex = Math.floor(Math.random() * allSongs.length);
      dispatch(SetCurrentSongIndex(randomIndex));
      dispatch(SetCurrentSong(allSongs[randomIndex]));
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [currentSong]);

  useEffect(() => {
    if (!currentSong && allSongs.length > 0) {
      dispatch(SetCurrentSong(allSongs[0]));
    }
  }, [allSongs]);

  useEffect(() => {
    if (currentTime) {
      audioRef.current.currentTime = currentTime;
    }
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 shadow-lg  ">
      <div className="flex justify-between items-center p-5 shadow-xl bg-[#201f1f] ">
        <div className="flex items-center gap-6">
          <div className="w-96 loaderplayer">
            <span className='strokes'></span>
            <span className='strokes'></span>
            <span className='strokes'></span>
          </div>
          <div className="w-96">
            <h1 className="text-active text-2xl">{currentSong?.title}</h1>
            <h1 className="text-white">
              {currentSong?.artist} - THB {currentSong?.price}
            </h1>
          </div>
        </div>

        <div className="w-full flex flex-col items-center drop-shadow-lg">
          <audio
            src={currentSong?.src}
            ref={audioRef}
            onTimeUpdate={(e) => {
              dispatch(SetCurrentTime(e.target.currentTime));
            }}
          ></audio>
          <div className="flex gap-20 items-center">
            <div className="text-[#bda599c2] hover:text-[#ffffff] transition ease-in-out delay-50 hover:scale-110">
              <i class="fa-solid fa-backward-step text-4xl" onClick={onPrev}></i>
            </div>
            {isPlaying ? (
              <div className="text-[#ff6e35] hover:text-[#ff6532] transition ease-in-out delay-50 hover:scale-110 opacity-80">
                <i className="fa-solid fa-circle-pause fa-2xl text-6xl " onClick={onPause}></i>
              </div>
            ) : (
              <div className="text-[#ff6d38c9] hover:text-[#ff6532] transition ease-in-out delay-50 hover:scale-110 opacity-80">
                <i className="fa-solid fa-circle-play fa-2xl text-6xl" onClick={onPlay}></i>
              </div>
            )}
            <div className="text-[#bda599c2] hover:text-[#ffffff] transition ease-in-out delay-50 hover:scale-110">
              <i className="fa-solid fa-forward-step fa-xl text-4xl" onClick={onNext}></i>
            </div>
          </div>
          <div className="flex gap-3 items-center w-full">
            <i
              className={`ri-shuffle-line text-xl text-white ${shuffleOn && "text-white font-semibold"
                }`}
              onClick={() => {
                setShuffleOn(!shuffleOn);
              }}
            ></i>
            <h1 className="text-[#bda599c2] hover:text-[#ffffff]">
              {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
            </h1>
            <input
              type="range"
              className="p-0 w-full bg-gray-200"
              min={0}
              max={Number(currentSong?.duration) * 60}
              value={currentTime}
              onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
                dispatch(SetCurrentTime(e.target.value));
              }}
            />
            <h1 className="text-[#bda599c2] hover:text-[#ffffff]">{currentSong?.duration}</h1>
          </div>
        </div>

        <div className="flex gap-3 items-center drop-shadow-2xl">
          <i
            className="ri-volume-mute-line text-3xl text-[#bda599c2] hover:text-white"
            onClick={() => {
              setVolume(0);
              audioRef.current.volume = 0;
            }}
          ></i>
          <input
            type="range"
            className="p-0"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => {
              audioRef.current.volume = e.target.value;
              setVolume(e.target.value);
            }}
          />
          <i
            className="ri-volume-down-line text-3xl text-[#bda599c2] hover:text-white"
            onClick={() => {
              setVolume(1);
              audioRef.current.volume = 1;
            }}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Player;
