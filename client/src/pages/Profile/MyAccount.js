import React from 'react';
import { useSelector } from 'react-redux';
import "./Profile.css"
import moment from 'moment-timezone'


function MyAccount() {
    const { allSongs, user } = useSelector((state) => state.user);

    return (
        <div className="p-5 flex flex-col w-1/2 text-secondary">
            <h1 className='text-3xl ml-7 font-bold drop-shadow-lg' >
                <b className='text-[#a09f9f] hover:text-[#ff983d]'><i className="fa-solid fa-user-shield" /> My</b><b className='text-[#f4efeb]'> Account</b>
            </h1>
            <div className='profile-form p-5 w-1/2 justify-between'>
                <span className='text-xl flex justify-between'>
                    Username  <span className='text-active'> {user.name} <i class="fa-solid fa-circle-check"></i></span> <br />
                </span>
                <span className='text-xl flex justify-between'>
                    FirstName  <span> {user.firstname}</span><br />

                </span>
                <span className='text-xl flex justify-between'>
                    LastName   <span> {user.lastname}</span><br />
                </span>
                <span className='text-xl flex justify-between'>
                    Email  <span> {user.email}</span> <br />
                </span>
                <span className='text-xl flex justify-between'>
                    Artist-Type   <span> {user.type}</span> <br />
                </span>
                <span className='text-xl flex justify-between'>
                    Nation  <span> {user.nation}</span> <br />
                </span>
                <span className='text-xl flex justify-between'>
                    Created At  <span> {moment(user.updatedAt).tz("Asia/Bangkok").format('ddd, DD. MMMM YYYY HH:mm:ss')}</span> <br />
                </span>
            </div>

        </div>
    );
}

export default MyAccount;
