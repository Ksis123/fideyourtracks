import React from "react";
import "./Home.css"

import SongsList from "../components/SongsList";
import Playlists from "../components/Playlists";
import Player from "../components/Player";

function Home() {
  return (
    <div className="">
      <div className="p-5 flex gap-5">
        <div className="w-2/4 p-5 backdrop-blur-sm bg-[#161514c1]  rounded-full drop-shadow-lg">
          <Playlists />
        </div>
        <div className="w-3/4 p-5 backdrop-blur-sm bg-[#161414c1] rounded-lg drop-shadow-lg ">
          <SongsList />
        </div>
      </div>
      <Player />
    </div>
  );
}

export default Home;
