import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AddEditSong.css"
import Player from "../../components/Player";

function ManageHome() {
  const { allSongs, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  

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
                  <i className="fa-solid fa-trash"
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
