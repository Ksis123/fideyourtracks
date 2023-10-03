import React, { useEffect} from "react";
import "./AddEditSong.css"


import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FileUploader } from "react-drag-drop-files";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import axios from "axios";
import toast from "react-hot-toast";
import Select from 'react-select';
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
    price: "",
    genre: "",
    duration: "",
    file: "",
  });

  const options = [
    { value: 'Classic', label: 'Classic' }, { value: 'Blue', label: 'Blue' }, { value: 'Rock', label: 'Rock' },{ value: 'Alternative', label: 'Alternative' },
    { value: 'EDM', label: 'EDM' }, { value: 'Pop ', label: 'Pop ' }, { value: 'R&B', label: 'R&B' },
    { value: 'Hip-hop', label: 'Hip-hop' }, { value: 'Instrumental', label: 'Instrumental' }, { value: 'Indie', label: 'Indie' },
    { value: 'Anime', label: 'Anime' }, { value: 'Gaming', label: 'Gaming' }, { value: 'Chill', label: 'Chill' },
  ];

  const handleChange = (file) => {
    setSong({ ...song, file: file });
    console.log(file);
  };

  const handleChangeGenre = (genre) => {
    setSong({ ...song, genre: genre });
    console.log(genre);
  };
  

  const onAdd = async () => {
    try {
      dispatch(ShowLoading());
      const formData = new FormData();
      Object.keys(song).forEach((key) => {
        formData.append(key, song[key]);
      });
      const response = await axios.post("/api/manage/add-song", formData, {
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
      const response = await axios.post("/api/manage/edit-song", formData, {
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
      if ((user?.isAdmin && !user.isAdmin) || !user?.isAdmin) {
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
          <h1 className="text-4xl">{songId ? "Edit" : "Upload"} Song</h1>
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
                  className="sigininput"
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
                  className="sigininput"
                  placeholder="Enter artist name"
                  value={song.artist}
                  onChange={(e) => { setSong({ ...song, artist: e.target.value }) }}
                />
              </div>
            </div>
            <div className="doubleinput gap-5 flex justify-between">
              <div className="w-1/2">
                <div className="emailtext">
                  Price <small>( THB )</small>
                </div>
                <div className="">
                  <input
                    type="text"
                    className="selectinput"
                    placeholder="Enter price"
                    value={song.price}
                    onChange={(e) => { setSong({ ...song, price: e.target.value }) }}
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="emailtext translate-x-[17rem] ">
                  Duration
                </div>
                <div className="">
                  <input
                    type="text"
                    className="selectinput"
                    placeholder="Enter duration"
                    value={song.duration}
                    onChange={(e) => { setSong({ ...song, duration: e.target.value }) }}
                  />
                </div>
              </div>
              {/* <Select
                name="genre"
                value={song.genre}
                className="w-1/2 drop-shadow-lg"
                onChange={handleChangeGenre}
                options={options}
                placeholder="Select Genre"
              /> */}
              <div className="w-1/2">
                <div className="emailtext translate-x-[35rem] ">
                  Genre
                </div>
                <div className="">
                  <input
                    type="text"
                    className="selectinput"
                    placeholder="Enter duration"
                    value={song.genre}
                    onChange={(e) => { setSong({ ...song, genre: e.target.value }) }}
                  />
                </div>
              </div>
            </div>
            <div>
              <FileUploader
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
