import React, { useState } from "react"
import "./resetpassword.css"

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

function ResetPassword() {

  const dispatch = useDispatch();
  const setForgotPasswordLinkSent = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });  

  const resetpassword = async (e) => {
    e.preventDefault()
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/send-reset-password-link", user);
      dispatch(HideLoading());
      if (response.data.success) {
        await MySwal.fire({
          title: <strong>{response.data.message}</strong>,
          showConfirmButton: false,
          html: 'we send link to your E-mail',
          icon: 'success',
          timer: 1500
        })
        setForgotPasswordLinkSent(true);
      } else {
        MySwal.fire({
          title: <strong>Please check Your E-mail</strong>,
          html: 'to Verified reset Password',
          showConfirmButton: false,
          timer: 1000,
          icon: 'warning'
        });
      }
    } catch (error) {
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
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
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
                </a>
              </p>

            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword;

