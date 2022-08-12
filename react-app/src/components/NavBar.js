import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import "./NavBar.css";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [active, setActive] = useState(false);
  const [userOptions, setUserOptions] = useState(false);

  const handleUserOptions = (e) => {
    setUserOptions((current) => !current);
  };

  const handleNav = () => {
    setActive((current) => !current);
  };
  return (
    <nav>
      <div className="all-nav-container">
        <div className="home-logo-container">
          <NavLink to="/" exact={true} className="active-logo">
            <img className="logo-navbar" src="../../favicon.ico" />
          </NavLink>
        </div>
        <div className="nav-buttons-container">
          <ul className="nav-ul">
            <li className="nav-li">
              <NavLink to="/" exact={true} className="active">
                <i
                  title="Home"
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
                title="LinkedIn"
                href="https://www.linkedin.com/in/connor-burns-647766194/"
                target="_blank"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li className="nav-li">
              <a
                title="Github"
                href="https://github.com/ConnorBurns1993/reacthook"
                target="_blank"
              >
                <i className="fa-brands fa-github"></i>
              </a>
            </li>
            <li className="nav-li">
              <i
                title="Connect"
                className="fa-brands fa-solid fa-people-arrows"
              ></i>
            </li>
          </ul>
        </div>
        <div className="nav-img">
          <img
            title="Account"
            className="profile-picture-nav"
            src={sessionUser?.profile_pic}
            onClick={handleUserOptions}
          />
          {userOptions && (
            <div className="user-options-container">
              <div>
                <div className="user-options-inner">
                  <img
                    className="profile-picture-nav"
                    src={sessionUser?.profile_pic}
                  />
                  <h3 className="profile-name-options">
                    {sessionUser?.first_name} {sessionUser?.last_name}
                  </h3>
                </div>
                <LogoutButton />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
