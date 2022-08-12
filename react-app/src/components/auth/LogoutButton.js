import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import "../NavBar.css";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return (
    <>
      <div className="logout-icon-wrapper">
        <img
          className="logout-icon"
          src="https://cdn-icons-png.flaticon.com/128/1828/1828479.png"
        />
      </div>
      <div className="logout-div-nav">
        <i onClick={onLogout} className="fa-solid fa-door"></i>
        <p onClick={onLogout} className="logout-text">
          Log Out
        </p>
      </div>
    </>
  );
};

export default LogoutButton;
