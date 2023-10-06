import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./AddEditSong.css"
import Player from "../../components/Player";

import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";

function ManageHome() {
  const { allSongs, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        "/api/user/deletesong",
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
        toast.success("Tracks deleted successfully");
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
      if ((user?.isAdmin && !user.isAdmin) || !user?.isAdmin) {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div>
      <div className="flex justify-between drop-shadow-lg">
        <h1 className="text-3xl text-secondary">All Songs</h1>
        <button
          className="summit-button"
          onClick={() => {
            navigate("/manage/add-edit-song");
          }}
        >
          Upload <i className="fa-solid fa-circle-right drop-shadow-lg" />
        </button>
      </div>
      <table className="w-full mt-5 bg-[#161414e0] drop-shadow-lg">
        <thead className="w-full">
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Genre</th>

            <th>Price</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-secondary">
          {allSongs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.genre}</td>
              <td>THB {song.price}</td>
              <td>{song.duration}</td>
              <td>
                <button className="editback-button">
                  <i
                    className="fa-solid fa-pen"
                    onClick={() => {
                      navigate("/manage/add-edit-song/?id=" + song._id);
                    }}
                  ></i>
                </button>
                <button className="delete-button">
                  <i className="fa-solid fa-trash" onClick={(onDelete)}
                  ></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Player/>                
    </div>
  );
}

export default ManageHome;
