// pages/UserActivityLogPage.jsx
import React from "react";
// import MenuAdmin from "../../../../components/layout/MenuAdmin";
import UserActivityLog from "./UserActivityLog";
import Sidebar from "pages/admin/sidebar/Sidebar";
const UserActivityLogPage = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <UserActivityLog />
    </div>
  );
};

export default UserActivityLogPage;
