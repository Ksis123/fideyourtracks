import React, { useEffect } from "react";
import "./AddEditSong.css"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { Form } from "antd";

import axios from "axios";
import toast from "react-hot-toast";

import { SetAllSongs } from "../../redux/userSlice";
import Player from "../../components/Player";



function EditSong() {
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

  const antValidationError = [
    {
      message: "Required",
      required: true,
    },
  ];

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
      <div className="editsong-bg">
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
                  value={song.artist}
                  onChange={(e) => { setSong({ ...song, artist: e.target.value }) }}
                />
              </div>
            </div>
            <div className="gap-5 flex">
                <Form.Item className=" text-[#ffffff]" name="duration" rules={antValidationError}>
                  <div className="label ">
                    Duration
                  </div>
                  <input
                    className="manageinput"
                    type="number"
                    step="0.01"
                    min='0'
                    placeholder="Enter duration"
                    value={song.duration}
                    onChange={(e) => { setSong({ ...song, duration: e.target.value }) }}
                  />
                </Form.Item>
                <Form.Item className=" text-[#ffffff]" name="genre" rules={antValidationError}>
                  <div className="label ">
                    Genre
                  </div>
                  <select
                    className="manageinput"
                    value={song.genre}
                    onChange={(e) => { setSong({ ...song, genre: e.target.value }) }}
                  >
                    <option value="">--- select genre ---</option>
                    <option value="Acoutic">Acoutic</option>
                    <option value="Alternative / Indie">Alternative / Indie</option>
                    <option value="Blues">Blues</option>
                    <option value="Country">Country</option>
                    <option value="Classic">Classic</option>
                    <option value="Disco">Disco</option>
                    <option value="EDM">Electronic Dance</option>
                    <option value="Funk">Funk</option>
                    <option value="Hip-hop">Hip-hop</option>
                    <option value="India">India</option>
                    <option value="Instrument">India</option>
                    <option value="Jazz">Jazz</option>
                    <option value="Rock">Rock</option>
                    <option value="90s">90s</option>
                    <option value="Pop">Pop</option>
                    <option value="J-pop">J-pop</option>
                    <option value="K-pop">K-pop</option>
                    <option value="T-pop">T-pop</option>
                    <option value="Thai">ไทยสากล</option>
                    <option value="ลูกทุ่ง">ลูกทุ่ง</option>
                    <option value="หมอลำ">หมอลำ</option>
                  </select>
                </Form.Item>
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
                  >
                    Back
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
      <Player />

    </div>
  );
}

export default EditSong;
