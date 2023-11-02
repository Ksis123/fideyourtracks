import React, { useEffect, useState } from "react";
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

  const [showButton, setShowButton] = useState(false);

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
      <div className="top flex cursor-pointer text-[#ff9603da] text-left font-bold">
        <div className="w-[22.5vw]"><h1>Title</h1></div>
        <div className="w-[18vw]"><h1>Artist</h1></div>
        <div className="w-[12vw]"><h1>Genre</h1></div>
        <div className="w-[7vw]"><h1>Durtation</h1></div>
        <div className="w-[28.5vw]"><h1>Release Date</h1></div>
        <div className=""><h1>Actions</h1></div>
      </div>
      <div className="overflow-y-scroll h-[54vh]">
        <table className="w-full  bg-[#161414e0] drop-shadow-lg text-left">
          <tbody className=" text-secondary">
            {allSongs.map((song) => 

            ( 
              <tr key={song}>
              <td>{song.title}</td>
              <td>
                <h6><a>By </a> <b className="text-active">  <i class="fa-solid fa-user-shield" /> {song.artist}</b></h6>
              </td>
              <td>{song.genre}</td>
              <td>{song.duration} </td>
              <td>{moment(song.updatedAt).tz("Asia/Bangkok").format('ddd, DD. MMMM YYYY HH:mm:ss')}</td>
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
          
          
          {/* <tbody >
            {allSongs.map((song) => (
              <tr key={song.artist}>
                <td>{song.title}</td>
                <td>
                  <h6><a>By </a> <b className="text-active">  <i class="fa-solid fa-user-shield" /> {song.artist}</b></h6>
                </td>
                <td>{song.genre}</td>
                <td>{song.duration} </td>
                <td>{moment(song.updatedAt).tz("Asia/Bangkok").format('ddd, DD. MMMM YYYY HH:mm:ss')}</td>
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
          </tbody> */}
        </table>
      </div>
      <Player />
    </div>
  );
}

export default ManageHome;
