import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const Anecdote = ({ anecdote, clickHandler }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={clickHandler}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const dispatch = useDispatch();
  const voteHandler = (id) => {
    dispatch(vote(id));
    dispatch(setNotification("voted!"));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          clickHandler={() => voteHandler(anecdote.id)}
          key={anecdote.id}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
