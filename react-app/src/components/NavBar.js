import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [active, setActive] = useState(false);

  const handleNav = () => {
    setActive((current) => !current);
  };

  return (
    <nav>
      <ul className="navigation">
        <div className="home-logo-container">
          <li className="nav-li">
            <NavLink to="/" exact={true} activeClassName="active-logo">
              <img className="logo-navbar" src="../../favicon.ico" />
            </NavLink>
          </li>
        </div>
        <div className="nav-buttons-container">
          <li className="nav-li">
            <NavLink to="/" exact={true} activeClassName="active">
              <i
                className="home-logo fa-solid fa-house fa-brands"
                style={{
                  color: active ? "rgb(27,116,228)" : "rgb(150, 150, 150)",
                  borderBottom: active ? "3px solid rgb(27,116,228)" : "",
                  backgroundColor: active ? "white" : "",
                  borderRadius: active ? "" : "10px",
                }}
                onClick={handleNav}
              ></i>
            </NavLink>
          </li>
          <li className="nav-li">
            <a
              href="https://www.linkedin.com/in/connor-burns-647766194/"
              target="_blank"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </li>
          <li className="nav-li">
            <a
              href="https://github.com/ConnorBurns1993/reacthook"
              target="_blank"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </li>
          {/* <li className="nav-li">
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li className="nav-li">
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li> */}
          <li className="nav-li">
            <i className="fa-brands fa-solid fa-people-arrows"></i>
          </li>
          <div className="nav-img">
            <img
              className="profile-picture-nav"
              src={sessionUser.profile_pic}
            />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default NavBar;
