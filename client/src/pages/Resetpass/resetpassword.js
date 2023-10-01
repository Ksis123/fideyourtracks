import React, { useState } from "react"
import "./resetpassword.css"

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";





function ResetPassword() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });
  const resetpassword = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post("/api/users/forgot-password", user);
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
      <div className="backgoundre">     
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
                            <button type="submit" className="sigup-button" onClick={resetpassword}>
                                Submit
                            </button>
                        </div>
                            <p>
                                <a className="resetsigninspan" href="/signin">Sign In</a> |
                                <a className="resetsignupspan" href="/signup">Sign Up </a>
                            </p>
                      </div>
                      <br/>
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

