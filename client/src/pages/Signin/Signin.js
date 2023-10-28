import React, { useState } from "react";
import './Login.css'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const signin = async (e) => {
    e.preventDefault()

    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/signin", user);
      dispatch(HideLoading());
      if (response.data.success) {
        await MySwal.fire({
          title: <strong>{response.data.message}</strong>,
          showConfirmButton: false,
          html: 'Welcome to the Club',
          icon: 'success',
          timer: 1500
        })
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        MySwal.fire({
          title: <strong>{response.data.message}</strong>,
          html: 'Please enter valid value',
          icon: 'error',
        })
      }
    } catch (error) {
      MySwal.fire({
        title: <strong>Something went wrong</strong>,
        html: 'Please enter valid value',
        icon: 'error',
      })
      dispatch(HideLoading());
      console.log(error);
    }
  };
  return (
    <div className="backgound">
      <div className="bg">
        <div className="sigin-holder">
          <form className="signin-form">
            <div className="sigin-div">
              <div className="loader">
                <span className='stroke'></span>
                <span className='stroke'></span>
                <span className='stroke'></span>
                <span className='stroke'></span>
                <span className='stroke'></span>
                <span className='stroke'></span>
                <span className='stroke'></span>
                <span className='stroke'></span>
                <span className='stroke'></span>
                <span className='stroke'></span>
              </div>
              <div className="welcome">
                <img
                  className="lg:block h-10 w-auto"
                  src="https://salmon-charming-stingray-66.mypinata.cloud/ipfs/Qmby9QDniPG7R8bE8XTJvon8KGFX7ZdKFGyYbiPCb5W4zn?_gl=1*1chzkqg*_ga*MTE0ODI0Mjc0LjE2OTY4NjQ2MTU.*_ga_5RMPXG14TE*MTY5ODIyNTk3My4zNy4xLjE2OTgyMjYwODcuMTAuMC4w"
                />
                <h4 className="text-3xl ml-2 p-1 font-bold drop-shadow-lg"> 
                 <b className="text-primary hover:text-[#ff983d]">Fide</b><b className="text-secondary">yourtracks</b>
                </h4>                
              </div>
              <div className="emailinput">
                <div className="emailtext">
                  E-mail
                </div>
                <div className="email">
                  <input
                    type="text" required
                    className="sigininput"
                    placeholder="Enter e-mail"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="passwordinput">
                <div className="passwordtext">
                  Password <small> (must be 6-12 characters)</small>
                </div>
                <div className="password">
                  <input
                    type="password" required
                    className="sigininput"
                    placeholder="Enter password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <button className="sigup-button" onClick={() => { navigate("/signup") }}>
                  Sign up
                </button>
                <button type="submit" className="sigin-button" onClick={signin}
                >
                  Sign in
                </button>
              </div>
              <span className="signup">Don't you
                <span className="signupspan" onClick={() => { navigate("/resetpassword") }}>
                  Forgot Password
                </span>
              </span>
            </div>
            <br />
            <div className='text'>
              <p>Copyright © 2023 Fideyourtracks by Ksis123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
