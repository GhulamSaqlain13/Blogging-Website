import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Context } from "../../main";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const handleNavbar = () => {
    setShow(!show);
  };

  const isDashboard = useLocation("http://localhost:5173/dashboard");
  const { mode, setMode, isAuthenticated, setIsAuthenticated, user } =
    useContext(Context);
  const navigateTo = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        { withCredentials: true }
      );
      isAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <section
        className={
          isDashboard.pathname === "/dashboard"
            ? "hideNavbar"
            : mode === "dark"
            ? "header dark-navbar"
            : "header light-navbar"
        }
      >
        <nav>
          <div className="logo">
            Zeta<span>Blog</span>
          </div>
          <div className={show ? "links show" : "links"}>
            <ul>
              <li>
                <Link to={"/"} onClick={handleNavbar}>
                  HOME
                </Link>
              </li>
              <li>
                <Link to={"/blogs"} onClick={handleNavbar}>
                  BLOGS
                </Link>
              </li>
              <li>
                <Link to={"/authors"} onClick={handleNavbar}>
                  ALL AUTHORS
                </Link>
              </li>
              <li>
                <Link to={"/about"} onClick={handleNavbar}>
                  ABOUT
                </Link>
              </li>
            </ul>
            <div className="btns">
              <button
                onClick={() =>
                  mode === "light" ? setMode("dark") : setMode("light")
                }
                className={
                  mode === "light"
                    ? "mode-btn light-mode"
                    : "mode-btn dark-mode"
                }
              >
                {mode === "light" ? (
                  <CiLight className="light-icon" />
                ) : (
                  <MdDarkMode className="dark-icon" />
                )}
              </button>
              {isAuthenticated && user.role === "Author" ? (
                <Link
                  to={"/dashboard"}
                  onClick={handleNavbar}
                  className="dashboard-btn"
                >
                  DASHBOARD
                </Link>
              ) : (
                ""
              )}
              {!isAuthenticated ? (
                <Link
                  to={"/login"}
                  onClick={handleNavbar}
                  className="login-btn"
                >
                  LOGIN
                </Link>
              ) : (
                <div>
                  <button className="logout-btn" onClick={handleLogout}>
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
          </div>
          <RxHamburgerMenu className="hamburger" onClick={handleNavbar} />
        </nav>
      </section>
    </>
  );
};

export default Navbar;
