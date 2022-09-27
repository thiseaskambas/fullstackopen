import Anecdotes from "./components/Anecdotes";
import Form from "./components/Form";

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <h2>create new</h2>
      <Form />
    </div>
  );
};

export default App;
