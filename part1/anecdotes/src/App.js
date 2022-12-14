import { useState } from "react";

const anecdotes = [
  "If it hurts, do it more often.",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
];

const App = () => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const voteHandler = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };
  const maxVote = points.indexOf(Math.max(...points));
  return (
    <>
      <div>{anecdotes[selected]}</div>
      <p>
        This joke has {points[selected]}
        points.
      </p>
      <button onClick={voteHandler}>vote</button>
      <button
        onClick={() => {
          setSelected(Math.floor(Math.random() * anecdotes.length));
        }}
      >
        Next anecdote
      </button>
      <h2>Anecdote with most votes</h2>
      <div>{anecdotes[maxVote]}</div>
    </>
  );
};

export default App;
