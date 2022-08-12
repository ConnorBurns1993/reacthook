import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "../SplashPage.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(
        signUp(firstName, lastName, email, birthday, gender, password)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateGender = (e) => {
    setGender(e.target.value);
  };

  const updateBirthday = (e) => {
    setBirthday(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <form className="signup-container" onSubmit={onSignUp}>
      <h2 className="signup-h2">Sign Up</h2>
      <p className="signup-subheader">It's quick and easy.</p>
      <p className="signup-p">
        _________________________________________________________
      </p>
      <div className="signup-inner">
        <div></div>
        <div className="first-name-div">
          <input
            className="sign-up-first-name"
            type="text"
            name="first_name"
            placeholder="First Name (required)"
            onChange={updateFirstName}
            value={firstName}
          ></input>
        </div>
        <div>
          <input
            className="sign-up-last-name"
            type="text"
            name="last_name"
            placeholder="Last Name (required)"
            onChange={updateLastName}
            value={lastName}
          ></input>
        </div>
      </div>
      <div className="signup-inputs">
        <div>
          <input
            className="email-signup"
            placeholder="Email (required)"
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
          ></input>
          <input
            className="password-signup"
            placeholder="Password (required)"
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div>
          <input
            className="repeat-password"
            placeholder="Repeat Password (required)"
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div>
          <label className="birthday-label">Birthday (required)</label>
          <input
            className="birthday-signup"
            type="date"
            name="birthday"
            onChange={updateBirthday}
            value={birthday}
          ></input>
        </div>
        <div>
          <fieldset className="gender-signup">
            <legend className="gender-title-signup">Gender (required)</legend>
            <label className="gender-labels" for="Female">
              Female
              <input
                className="gender-inputs"
                type="radio"
                name="gender"
                onChange={updateGender}
                value="Female"
              />
            </label>
            <label for="Male" className="gender-labels">
              Male
              <input
                className="gender-inputs"
                type="radio"
                name="gender"
                onChange={updateGender}
                value="Male"
              />
            </label>
            <label for="Other" className="gender-labels">
              Other
              <input
                className="gender-inputs"
                type="radio"
                name="gender"
                onChange={updateGender}
                value="Other"
              />
            </label>
          </fieldset>
        </div>
        <button className="signup-submit" type="submit">
          Sign Up
        </button>
      </div>
      {errors.map((error, ind) => (
        <div className="signup-errors" key={ind}>
          {error}
        </div>
      ))}
    </form>
  );
};

export default SignUpForm;
