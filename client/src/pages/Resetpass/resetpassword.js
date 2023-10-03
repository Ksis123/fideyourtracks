import React, { useState } from "react"
import "./resetpassword.css"

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function ResetPassword() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const resetpassword = async (e) => {
    e.preventDefault()
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/send-reset-password-link", email);
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
      <div className="reset-bg">
        <div className="reset-holder">
          <form className="reset-form">
            <div className="reset-div">
              <div className="welcome">
                <h4><i class="fa-solid fa-envelope"></i>  Reset Password</h4>
              </div>
              <div className="emailinput">
                <div className="emailtext">
                  E-mail
                </div>
                <div className="email">
                  <input
                    type="text"
                    className="sigininput"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="submit">
                <button type="submit" className="sigin-button" onClick={resetpassword}>
                  Send-Link
                </button>
              </div>
              <p> Back to
                <a className="resetsigninspan hover:underline" onClick={() => navigate("/signin")}>
                  Sign in 
                </a> |
                <a className="resetsignupspan hover:underline" onClick={() => navigate("/signup")}>Sign Up </a>
              </p>
              
            </div>
            <br />
            <div className='text'>
              <p>Copyright © 2023 Fideyourtracks by Ksis123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword;

