import React from "react";
import LoginForm from "./auth/LoginForm";
import SignUpForm from "./auth/SignUpForm";

const SplashPage = () => {
  return (
    <>
      <img className="reacthook" src="https://i.imgur.com/hAKwnsI.png"></img>
      <h2 className="reacthook-h2">
        Connect with friends and the world around you on Reacthook.
      </h2>
      {/* <SignUpForm /> */}
      <LoginForm />
    </>
  );
};

export default SplashPage;
