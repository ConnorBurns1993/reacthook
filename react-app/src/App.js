import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar/NavBar";
import Posts from "./components/Posts/Posts";
import { getAllPosts } from "./store/posts";
import { authenticate } from "./store/session";
import Connect from "./components/Connect/Connect";
import NotFound from "./components/NotFound";
import User from "./components/Users/User";
import ScrollToTop from "./components/ScrollToTop";
import { getAllFriends } from "./store/friends";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const comments = useSelector((state) => state.comments);
  const friends = useSelector((state) => state.friends);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, sessionUser, comments]);

  useEffect(() => {
    dispatch(getAllFriends());
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact={true}>
          {sessionUser ? <NavBar /> : ""}
          <Posts />
        </Route>
        <Route path="/connect" exact={true}>
          <NavBar />
          <Connect />
        </Route>
        <Route path="/not-found" exact={true}>
          <NavBar />
          <NotFound />
        </Route>
        <Route path="/:userId" exact={true}>
          {sessionUser ? <NavBar /> : ""}
          <User />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
