import React from "react";
import { Tabs } from "antd";
import UserDetails from "./UserDetails";
import Player from "../../components/Player";
import MyAccount from "./MyAccount";

function Profile() {
  return (
    <div className=" font-bold ">
      <Tabs className="text-primary hover:text-active" defaultActiveKey="1">
        <Tabs.TabPane tab="Profile" key="1">
          <UserDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Account" key="2">
            <MyAccount/>
        </Tabs.TabPane>
      </Tabs>
      <Player/>
    </div>

  );
}

export default Profile;