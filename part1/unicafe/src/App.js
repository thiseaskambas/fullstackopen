import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Display = ({ title, value }) => {
  return (
    <p>
      {title} {value}
    </p>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Display title={"good"} value={good} />
      <Display title={"neutral"} value={neutral} />
      <Display title={"bad"} value={bad} />
    </>
  );
};

export default App;
