import React, { useEffect } from "react";
import "./AddEditSong.css"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";

import { SetAllSongs } from "../../redux/userSlice";

function AddEditSong() {
  const { allSongs, user } = useSelector((state) => state.user);
  
  const urlParams = new URLSearchParams(window.location.search);
  const songId = urlParams.get("id");

  const dispatch = useDispatch();
  const fileTypes = ["MP3"];
  const navigate = useNavigate();
  const [song, setSong] = React.useState({
    title: "",
    artist: "",
    genre: "",
    duration: "",
    file: "",
  });


  const handleChange = (file) => {
    setSong({ ...song, file: file });
    console.log(file);
  };


  const onAdd = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      const response = await axios.post("/api/manage/add-track", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Track Upload successfully");
        dispatch(SetAllSongs(response.data.data));
        navigate("/manage");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  const onEdit = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      formData.append("_id", songId);
      const response = await axios.post("/api/manage/edit-track", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success("Track updated successfully");
        dispatch(SetAllSongs(response.data.data));
        navigate("/manage");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (songId && songId !== "") {
      const existingSong = allSongs.find((s) => s._id === songId);
      setSong(existingSong);
    }
  }, [allSongs]);

  useEffect(() => {
    if (user) {
      if ((user?.isMember && !user.isMember) || !user?.isMember) {
        navigate("/");
      }
    }
  }, [user]);

  return (
    <div className="addbackgound">
      <div className="addsong-bg">
        <div className="flex items-center gap-5 text-secondary">
          <button className="adback-button">
            <i
              class="fa-solid fa-circle-arrow-left text-5xl"
              onClick={() => {
                navigate("/manage");
              }}
            ></i>
          </button>
          <h1 className="text-4xl">{songId ? "Edit" : "Upload"} Track</h1>
        </div>
        <div className="addsong-holder">
          <div className="addsong-div">
            <div className="welcome">
              <h4><i className="fa-solid fa-music" /> Manage Track  </h4>
            </div>
            <div className="emailinput">
              <div className="emailtext">
                Title
              </div>
              <div className="email">
                <input
                  type="text"
                  className="selectinput1"
                  placeholder="Enter your title"
                  value={song.title}
                  onChange={(e) => { setSong({ ...song, title: e.target.value }) }}
                />
              </div>
            </div>
            <div className="emailinput">
              <div className="emailtext">
                Artist
              </div>
              <div className="email">
                <input
                  type="text"
                  className="selectinput1"
                  placeholder= {user?.name}
                  disabled
                  value={song.artist = user.name}
                  onChange={(e) => { setSong({ ...song, artist: e.target.value }) }}
                />
              </div>
            </div>
            <div className="doubleinput gap-5 flex justify-between">
              <div className="w-1/2">
                <div className="emailtext ">
                  Duration
                </div>
                <input
                  type="text"
                  className="selectinput"
                  placeholder="Enter duration"
                  value={song.duration}
                  onChange={(e) => { setSong({ ...song, duration: e.target.value }) }}
                />
              </div>
              <div className="w-1/2">
                <div className="emailtext translate-x-[17rem] ">
                  Genre
                </div>
                  <input
                    type="text"
                    className="selectinput"
                    placeholder="Enter genre"
                    value={song.genre}
                    onChange={(e) => { setSong({ ...song, genre: e.target.value }) }}
                  />
              </div>
            </div>
            <div>
              <FileUploader
                className='bg-primary'
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
              {song.file && <h1 className="text-primary">{song.file.name}</h1>}

              <div className="p-4 flex justify-end">
                {songId && songId !== "" ? (
                  <button
                    className="addsummit-button"
                    onClick={onEdit}
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="addsummit-button"
                    onClick={onAdd}
                  >
                    Upload
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddEditSong;
