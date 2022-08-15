import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { login } from "../../store/session";
import Footer from "../Footer";
import "../SplashPage.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)).then(() =>
      history.push("/")
    );
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  // if (user) {
  //   return <Redirect to="/" />;
  // }

  return (
    <>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div className="login-errors" key={ind}>
              {error}
            </div>
          ))}
        </div>
        <div className="login-container">
          <div>
            <input
              className="login-email"
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div>
            <input
              className="login-password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
            <button className="login-splash" type="submit">
              Log In
            </button>
            <button
              onClick={() => {
                setEmail("demo@aa.io");
                setPassword("password");
              }}
              id="demoBtn"
              type="submit"
            >
              Want a demo?
            </button>
            <p className="p5">___________________________________________</p>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default LoginForm;
