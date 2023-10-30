import React from "react";
import { Tabs } from "antd";
import UserDetails from "./UserDetails";
import Player from "../../components/Player";


function Profile() {
  return (
    <div className=" font-bold ">
      <Tabs className="text-primary hover:text-active" defaultActiveKey="1">
        <Tabs.TabPane tab="Profile" key="1">
          <UserDetails />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Tracks" key="2">
        </Tabs.TabPane>
      </Tabs>
      <Player/>
    </div>

  );
}

export default Profile;