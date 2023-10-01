import React from "react";
import "./Home.css"

import SongsList from "../components/SongsList";
import Playlists from "../components/Playlists";
import Player from "../components/Player";

function Home() {
  return (
    <div className="bg-[#282727f1] rounded-full ">
      <div className="p-5 flex gap-5 home-bg">
        <div className="w-4/4 p-5 bg-[#fcf7f4] rounded-full drop-shadow-lg">
          <Playlists />
        </div>
        <div className="w-3/4 p-5 bg-[#fffefe] rounded-lg drop-shadow-lg">
          <SongsList />
        </div>

      </div>
      <Player />

    </div>
  );
}

export default Home;
