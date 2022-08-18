import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";
import SearchBar from "./SearchBar";
import "./NavBar.css";
import useComponentVisible from "./useComponentVisible";

const NavBar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [active, setActive] = useState(true);
  const [home, setHome] = useState(true);
  const [connect, setConnect] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  const { pathname } = useLocation();

  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleHome = () => {
    setHome(true);
    setConnect(false);
  };

  const handleConnect = () => {
    setHome(false);
    setConnect(true);
  };

  return (
    <nav>
      <div className="all-nav-container">
        <div className="home-logo-container">
          <NavLink to="/" exact={true}>
            <img className="logo-navbar" src="../../favicon.ico" />
          </NavLink>
          <SearchBar placeholder="Search Reacthook" users={users} />
        </div>
        <div className="nav-buttons-container">
          <ul className="nav-ul">
            <li
              className={
                active && home && pathname === "/" ? "nav-li-active" : "nav-li"
              }
              onClick={handleHome}
            >
              <NavLink to="/" exact={true}>
                <i
                  title="Home"
                  className={
                    active && home && pathname === "/"
                      ? "home-logo-active fa-solid fa-house fa-brands"
                      : "home-logo fa-solid fa-house fa-brands"
                  }
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
            <li
              className={
                active && connect && pathname === "/connect"
                  ? "nav-li-active"
                  : "nav-li"
              }
              onClick={handleConnect}
            >
              <NavLink to="/connect" exact={true}>
                <i
                  title="Connect"
                  className={
                    active && connect && pathname === "/connect"
                      ? "arrows-active fa-brands fa-solid fa-people-arrows"
                      : "fa-brands fa-solid fa-people-arrows"
                  }
                ></i>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="nav-img">
          <img
            title="Account"
            ref={ref}
            className="profile-picture-nav"
            src={sessionUser?.profile_pic}
            onClick={() => setIsComponentVisible(!isComponentVisible)}
          />
          {isComponentVisible && (
            <div ref={ref} className="user-options-container">
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
