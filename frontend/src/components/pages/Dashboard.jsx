import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import CreateBlog from "../minicomponents/CreateBlog";
import MyProfile from "../minicomponents/MyProfile";
import MyBlogs from "../minicomponents/MyBlogs";
import Chart from "../minicomponents/Chart";
import { Context } from "../../main";

const Dashboard = () => {
  const [component, setComponent] = useState("MyBlogs");
  const { mode, isAuthenticated } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <section
      className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}
    >
      <SideBar component={component} setComponent={setComponent} />
      {component === "My Profile" ? (
        <MyProfile />
      ) : component === "Create Blog" ? (
        <CreateBlog />
      ) : component === "Analytics" ? (
        <Chart />
      ) : (
        <MyBlogs />
      )}
    </section>
  );
};

export default Dashboard;
