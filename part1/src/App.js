import "./App.css";

const Hello = (props) => {
  return (
    <>
      <p>
        Hello {props.name}, it is now {props.date}
      </p>
    </>
  );
};

const App = () => {
  console.log("hello from App component");

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="WORLD" date={new Date().toDateString()} />
      <Hello name="YOU" date={new Date().toDateString()} />
    </>
  );
};

export default App;
