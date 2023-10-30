import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from 'moment-timezone'

import "./AddEditSong.css"
import Player from "../../components/Player";

import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import {
  SetAllSongs,
} from "../../redux/userSlice";

import axios from "axios";
import toast from "react-hot-toast";

function ManageHome() {
  const { allSongs, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onDelete = async (song) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/manage/delete-track", { trackId: song._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Track deleted successfully");
        dispatch(
          SetAllSongs(
            (response.data.data)
          )
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (user) {
      if ((user?.isMember && !user.isMember) || !user?.isMember) {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div>
      <div className="flex justify-between drop-shadow-lg">
        <h1 className="text-3xl text-secondary">All Tracks</h1>
        <button
          className="summit-button"
          onClick={() => {
            navigate("/manage/add-track");
          }}
        >
          Upload <i className="fa-solid fa-circle-right drop-shadow-lg" />
        </button>
      </div>
      <br/>
      <div className="overflow-y-scroll h-96">
        <table className="w-full mt-5 bg-[#161414e0] drop-shadow-lg text-left">
          <thead className="w-full ">
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Release Date (D/M/Y : time)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className=" text-secondary">
            {allSongs.map((song) => (
              <tr key={song.id}>
                <td>{song.title}</td>
                <td>
                  <h6><a>By </a> <b className="text-active">  <i class="fa-solid fa-user-shield" /> {song.artist}</b></h6>
                </td>
                <td>{song.genre}</td>
                <td>{song.duration} </td>
                <td>{moment(song.createdAt).tz("Asia/Bangkok").format('ddd, DD. MMMM YYYY HH:mm:ss')}</td>
                <td>
                  <button className="editback-button">
                    <i
                      className="fa-solid fa-pen"
                      onClick={() => {
                        navigate("/manage/edit-track/?id=" + song._id);
                      }}
                    ></i>
                  </button>
                  <button className="delete-button">
                    <i className="fa-solid fa-trash"
                      onClick={() => onDelete(song)}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Player />
    </div>
  );
}

export default ManageHome;
