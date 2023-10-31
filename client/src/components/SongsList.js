import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
  SetSelectedPlaylist
} from "../redux/userSlice";

function SongsList() {
  const { currentSong, selectedPlaylist, allSongs } = useSelector(
    (state) => state.user
  );
  const [songsToPlay, setSongsToPlay] = React.useState([]);

  const dispatch = useDispatch();

  const [searchKey, setSearchKey] = React.useState("");

  useEffect(() => {
    if (selectedPlaylist) {
      if (
        selectedPlaylist &&
        selectedPlaylist.name === "All Songs" &&
        searchKey !== ""
      ) {
        const tempSongs = [];

        selectedPlaylist.songs.forEach((song) => {
          if (JSON.stringify(song).toLowerCase().includes(searchKey)) {
            tempSongs.push(song);
          }
        });
        console.log(tempSongs);
        setSongsToPlay(tempSongs);
      } else {
        setSongsToPlay(selectedPlaylist?.songs);
      }
    }
  }, [selectedPlaylist, searchKey]);

  return (
    <div className="flex flex-col drop-shadow-lg text-secondary">
      <div className="pr-[20rem] flex w-[40vw] p-2">
        <input
          className=" bg-[#302c2cc9] appearance-none border rounded w-[350px]  text-secondary leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search here to fideyourtrack ..."
          onFocus={() =>
            dispatch(
              SetSelectedPlaylist({
                name: "All Songs",
                songs: allSongs,
              })
            )
          }
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <h1><i className="fas fa-search text-[#ffffff87] hover:text-[#ffffff] transition ease-in-out delay-90" style={{ marginLeft: "10px", marginTop: "10px" }}></i></h1>
      </div>
      <div className="flex cursor-pointer text-[#ff724a] font-semibold">
        <div className="w-[20vw]"><h1>Title</h1></div>
        <div className="w-[11vw]"><h1>Artist</h1></div>
        <div className="w-[21vw]"><h1>Genre</h1></div>
        <div className=""><i className="far fa-clock" /></div>
      </div>
      < hr />
      <div className="overflow-y-scroll h-[54vh] p-3">
        {songsToPlay.map((song, index) => {
          const isPlaying = currentSong?._id === song._id;
          return (

            <div
              className={`p-1 flex items-center justify-between cursor-pointer ${isPlaying && "shadow rounded text-active font-semibold border-active border-2  delay-150"
                }`}
              onClick={() => {
                dispatch(SetCurrentSong(song));
                dispatch(SetCurrentSongIndex(index));
              }}
            >
              <i className={`fa-solid fa-circle-play ${isPlaying && "fa-solid fa-circle-pause fa-beat-fade  delay-150"
                }`}
              />
              <div className="w-1/2"><h1>{song.title}</h1></div>
              <div className="w-1/2"><h1>{song.artist}</h1></div>
              <div className="w-1/2"><h1>{song.genre}</h1></div>
              <div><h1>{song.duration}</h1></div>

            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongsList;
