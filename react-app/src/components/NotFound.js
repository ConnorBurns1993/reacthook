import React from "react";
import { NavLink } from "react-router-dom";
import "./SplashPage.css";
import { useHistory } from "react-router-dom";

const NotFound = () => {
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  return (
    <div className="not-found-wrapper">
      <img
        className="not-found-img"
        src="https://static.xx.fbcdn.net/rsrc.php/yN/r/MnQWcWb6SrY.svg"
      />
      <h2 className="not-found-h2">This Page Isn't Available</h2>
      <p>
        The link may be broken, or the page may have been removed. Check to see
        if the link you're trying to open is correct.
      </p>
      <NavLink className="back-to-feed" to="/" exact={true}>
        Go to News Feed
      </NavLink>
      <p className="go-back" onClick={handleBack}>
        Go Back
      </p>
    </div>
  );
};

export default NotFound;
