import React from "react";
import { Tabs } from "antd";
import UserDetails from "./UserDetails";

function Profile() {
  return (
    <div className=" font-bold ">
      <Tabs className="text-primary hover:text-active" defaultActiveKey="2">
        <Tabs.TabPane  tab="My Tracks" key="1">

        </Tabs.TabPane>
        <Tabs.TabPane tab="Profile" key="2">
          <UserDetails />
        </Tabs.TabPane>
      </Tabs>
    </div>

  );
}

export default Profile;