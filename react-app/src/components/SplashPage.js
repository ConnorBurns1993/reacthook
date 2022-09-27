import React from "react";
import LoginForm from "./auth/LoginForm";
import SignUpFormModal from "./auth/SignUpFormModal";
import Footer from "./Footer";

const SplashPage = () => {
  return (
    <>
      <div className="splash-wrapper">
        <div className="reacthook-logo-div">
          <img
            className="reacthook"
            src="https://i.imgur.com/Ik3igUA.png"
          ></img>
          <h2 className="reacthook-h2">
            Connect with friends and the world around you on Reacthook.
          </h2>
        </div>
        <div className="signup-login-wrapper">
          <LoginForm />
          <SignUpFormModal />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SplashPage;
