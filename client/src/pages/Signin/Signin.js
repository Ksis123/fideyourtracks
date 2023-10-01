import React, { useState } from "react";
import './Login.css'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const signin = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/signin", user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
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

                <h4> <i className="fa-solid fa-headphones-simple"></i> Fideyourtracks</h4>

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
                <button className="sigup-button" onClick={() => {
                  window.location.href = "./signup"
                }}> Sign up
                </button>
                <button type="submit" className="sigin-button"  onClick={signin}
                >
                  Sign in
                </button>
              </div>

              <span className="signup">Don't you
                <span className="signupspan" onClick={() => { window.location.href = "./resetpassword" }}>
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
