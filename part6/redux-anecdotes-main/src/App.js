import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectNotification } from "./reducers/notificationReducer";
import Anecdotes from "./components/Anecdotes";
import Form from "./components/Form";
import Notification from "./components/Notification";
import Filter from "./components/Filter";

import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const { notification } = useSelector(selectNotification);
  return (
    <div>
      {notification && <Notification notification={notification} />}
      <Filter />
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <Form />
    </div>
  );
};

export default App;
