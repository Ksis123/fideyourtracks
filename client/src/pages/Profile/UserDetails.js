import { Button, Form, message } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import axios from "axios";
import "./Profile.css"

import { SetUser } from "../../redux/userSlice";

function UserDetails() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const antValidationError = [
    {
      message: "Required",
      required: true,
    },
  ];

  const apiRequest = async ({ method, endPoint, payload, queryStrings }) => {
    try {
      const response = await axios({
        method,
        url: endPoint,
        data: payload,
        params: queryStrings,
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || error.message || "Something went wrong"
      );
    }
  };

  const UpdateUser = async (payload) => {
    return await apiRequest({
      method: "PUT",
      endPoint: "/api/users/update-user",
      payload,
    });
  };

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await UpdateUser({
        ...values,
        _id: user._id,
      });
      message.success(response.message);
      dispatch(SetUser(response.data));
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="profilebackgound">
      <div className="profile-bg">
        <div className="profile-holder">
          <div className="profile-div">
            <Form
              layout="vertical"
              className="flex flex-col gap-5 mt-3 w-96 font-bold"
              onFinish={onFinish}
              initialValues={{
                name: user.name,
                email: user.email,
              }}
            >
              <Form.Item className=" text-primary font-bold" label="Name" name="name" rules={antValidationError}>
                <input className="profileinput" />
              </Form.Item>
              <Form.Item className=" text-active" label="Email" name="email" rules={antValidationError}>
                <input className="proemail" disabled />
              </Form.Item>
              <Form.Item
                className=""
                label="Old Password"
                name="oldPassword"
                rules={antValidationError}
              >
                <input className="profileinput" type="password" />
              </Form.Item>
              <Form.Item
                className=""
                label="New Password"
                name="newPassword"
                rules={antValidationError}
              >
                <input className="profileinput" type="password" />
              </Form.Item>
              <div className="flex gap-5 ">
                <Button className="profile-button drop-shadow-lg font-bold" type="primary" htmlType="submit" block>
                  Update Profile
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;