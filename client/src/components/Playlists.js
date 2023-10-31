import axios from "axios";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

import {
  SetSelectedPlaylist,
  SetSelectedPlaylistForEdit,
  SetUser,
} from "../redux/userSlice";

function Playlists() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, allSongs, selectedPlaylist } = useSelector(
    (state) => state.user
  );
  const allPlylists = [
    {
      name: "total",
      songs: allSongs,
    },
    ...user.playlists,
  ];

  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/tracks/delete-playlist",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Playlist deleted successfully");
        dispatch(
          SetSelectedPlaylist({
            name: "All Songs",
            songs: allSongs,
          })
        );
        dispatch(SetUser(response.data.data));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allPlylists[0]));
    }
  }, [selectedPlaylist, allSongs]);

  return (
    <div className=" drop-shadow-lg shadow-[#ff8b0f]">
      <div className="flex justify-between w-full">
        <h1 className="text-secondary text-2xl "><i className="fa-solid fa-list-ol"/> Playlists</h1>
        <button className="p-2 drop-shadow-lg rounded-full bg-[#696968] hover:bg-[#f68216] transition ease-in-out delay-50 hover:scale-110">
          <h1
            className="cursor-pointer text-xl text-white"
            onClick={() => {
              navigate("/create-edit-playlist");
            }}
          >
            Create Playlist
          </h1>
        </button>
      </div>
      <div className="overflow-scroll h-[54vh] grid  grid-cols-3 gap-4 mt-5 p-5 text-secondary drop-shadow-lg">
        {allPlylists?.map((playlist, index) => {
          const isSelected = playlist?.name === selectedPlaylist?.name;
          return (
            <div
              className={`flex flex-col h-[15vh] gap-1 bg-[#313237] shadow border rounded p-2 cursor-pointer ${isSelected && "border-active "
                }`}
              onClick={() => {
                dispatch(SetSelectedPlaylist(playlist));
              }}
            >
              <h1 className="text-xl">{playlist?.name}</h1>
              <h1 className="text-sm">{playlist?.songs?.length} Tracks</h1>
              <hr />
              <div className="flex gap-6 justify-between">
                <i
                  className="fa-solid fa-trash text-2xl text-[#606060db] hover:text-[#fb352edb] transition ease-in-out delay-40"
                  onClick={() => {
                    onDelete(playlist.name);
                  }}
                ></i>

                <i
                  className="fa-solid fa-pen text-2xl text-[#7d7470db] hover:text-[#ff8325db] transition ease-in-out delay-40"
                  onClick={() => {
                    dispatch(SetSelectedPlaylistForEdit(playlist));
                    navigate(`/create-edit-playlist`);
                  }}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Playlists;
