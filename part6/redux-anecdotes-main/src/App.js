import Anecdotes from "./components/Anecdotes";
import Form from "./components/Form";
import Notification from "./components/Notification";

const App = () => {
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <Form />
    </div>
  );
};

export default App;
