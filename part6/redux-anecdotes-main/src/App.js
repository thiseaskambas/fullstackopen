import { useSelector } from "react-redux";
import { selectNotification } from "./reducers/notificationReducer";
import Anecdotes from "./components/Anecdotes";
import Form from "./components/Form";
import Notification from "./components/Notification";

const App = () => {
  const { notification } = useSelector(selectNotification);
  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <Form />
    </div>
  );
};

export default App;
