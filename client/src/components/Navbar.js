import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dropdown, Space, Badge } from 'antd';

import { SetSelectedPlaylist } from "../redux/userSlice";
import "./DefaultLayout.css"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, allSongs, selectedPlaylist } = useSelector(state => state.user)

    const [songsToPlay, setSongsToPlay] = React.useState([]);

    const [searchKey, setSearchKey] = React.useState("");



    const signout = () => {
        localStorage.removeItem('token')
        window.location.reload()
        navigate('/');
    };

    const checkUser = () => {
        let items = [];
        if (!user) {
            return items = [
                {
                    label: 'User',
                    key: '1',
                    icon: <i className="fa-solid fa-chalkboard-user" />,
                    onClick: () => navigate('/signup')
                }
            ];
        } else {
            return items = [
                {
                    label: 'Profile',
                    key: '1',
                    icon: <i className="fa-solid fa-user text-primary"></i>,

                    onClick: () => navigate('/manage')
                },
                {
                    label: 'Download',
                    key: '2',
                    icon: <i className="fa-solid fa-circle-down text-primary" />,

                    onClick: () => navigate('/manage')
                },
                {
                    label: 'Favorited',
                    key: '3',
                    icon: <i className="fa-solid fa-heart text-primary" />,

                    onClick: () => navigate('/manage')
                },
                {
                    label: 'Sign-out',
                    key: '4',
                    icon: <i className="fa-solid fa-right-from-bracket text-primary" />,
                    onClick: () => signout()
                },
            ];
        }
    }

    const items = checkUser();
    const menuProps = {
        items,
    };

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
        <div className="header flex justify-between p-5 items-center drop-shadow-lg">
            <h1 className='text-3xl ml-7 font-bold drop-shadow-lg' onClick={() => { navigate('/') }}>
                <b className='text-primary hover:text-[#ff983d]'><i className="fa-solid fa-headphones-simple" /> Fide</b><b className='text-[#f4efeb]'> yourtracks</b>
            </h1>
            <div className="w-[850px]" >
                <div className="d-flex justify-content-center">
                    <input
                        className="shadow appearance-none border rounded w-2/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                    <i className="fas fa-search text-grey" style={{ marginLeft: "-45px", marginTop: "10px" }}></i>
                </div>
            </div>
            <button className="upload-button  hover:text-primary drop-shadow-lg"
                onClick={() => {
                    navigate("/");
                }}
            >
                <i className="fa-solid fa-home text-2xl" /> Home
            </button>
            <button className="upload-button hover:text-primary drop-shadow-lg"
                onClick={() => {
                    navigate("/manage");
                }}
            >
                <i className="fa-solid fa-cloud-arrow-up text-2xl" /> Upload
            </button>
            <button className="upload-button drop-shadow-lg hover:text-primary"
                onClick={() => {
                    
                }}>
                <i className="fa-solid fa-wallet fa-lg"/> wallet
            </button>
            <button className="text-[#b7b5b5] hover:text-primary drop-shadow-lg"
                onClick={() => {
                    
                }}>
                <i className="fa-solid fa-cart-shopping fa-xl"></i>
            </button>
            <div className="flex items-center gap-5">
                <div class="flex mr-16 text-[#eb6d2efd]">
                    <Dropdown className='rounded-full text-sm font-medium drop-shadow-lg' menu={menuProps}>
                        <Button className='w-[auto] h-[auto] text-dark drop-shadow-lg border-[#ff7912e1]'>
                            <Space className='text-primary hover:text-[#2d81ab]'>
                                <Badge className=' -top-0 -right-0 bg-[#3cef18] hover:bg-[#26e0ee] rounded-full w-[15px] h-[15px] ' />
                                <h1 className='text-xl '>{user?.name}</h1>
                            </Space>
                        </Button>
                    </Dropdown>

                </div>
            </div>
        </div >
    )
}

export default Navbar;