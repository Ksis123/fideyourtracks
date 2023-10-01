import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  SetCurrentSong,
  SetCurrentSongIndex,
} from "../redux/userSlice";

function SongsList() {
  const { currentSong, selectedPlaylist } = useSelector(
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
    <div className="flex flex-col gap-3 drop-shadow-lg">

      <div className="overflow-y-scroll h-[54vh] p-3">
        {songsToPlay.map((song, index) => {
          const isPlaying = currentSong?._id === song._id;
          return (
            <div
              className={`p-2 flex items-center justify-between cursor-pointer ${
                isPlaying && "shadow rounded text-active font-semibold border-active border-2  delay-100"
              }`}
              onClick={() => {
                dispatch(SetCurrentSong(song));
                dispatch(SetCurrentSongIndex(index));
              }}
            > <i className="fa-solid fa-music text-[#ff8431]"></i>
              <div>
                <h1>{song.title}</h1>
              </div>
              <div>
                <h1>{song.artist}</h1>
              </div>
              <div>
                <h1>{song.duration}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SongsList;
