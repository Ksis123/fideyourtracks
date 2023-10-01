import React, { useState } from "react";
import './Login.css'

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const signup = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/signup", user);
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/signin");
      } else {
        toast.error(response.data.message);
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
              <div className="welcome">
                <h4>Sign-Up  <i className="fa-solid fa-right-to-bracket" /></h4>
              </div>
              <div className="emailinput">
                <div className="emailtext">
                  User Name
                </div>
                <div className="email">
                  <input
                    type="text" required
                    className="sigininput"
                    placeholder="Enter username"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                  />
                </div>
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
                <button className="back-button" onClick={() => { window.location.href = "./signin" }}>
                  <i className="fa-solid fa-circle-arrow-left"></i> Back
                </button>
                <button type="submit" className="sigup2-button" onClick={signup}>
                  Sign Up
                </button>
              </div>
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

export default Signup;
