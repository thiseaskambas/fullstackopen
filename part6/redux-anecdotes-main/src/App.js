import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNotification } from "./reducers/notificationReducer";

import Notification from "./components/Notification";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";

import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Anecdotes from "./components/Anecdotes";
import Form from "./components/Form";
import About from "./components/About";
import SingleView from "./components/SingleView";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const { notification } = useSelector(selectNotification);
  return (
    <div>
      <Navbar />
      {notification && <Notification notification={notification} />}
      <Routes>
        <Route path="/" element={<Anecdotes />} />
        <Route path="/anecdotes/:id" element={<SingleView />} />
        <Route path="/create" element={<Form />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <footer>some footer here</footer>
    </div>
  );
};

export default App;
