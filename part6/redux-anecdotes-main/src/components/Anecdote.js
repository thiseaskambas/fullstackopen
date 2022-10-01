import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { saveVote } from "../reducers/anecdoteReducer";
import { setAsyncNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const voteHandler = (anecdote) => {
    dispatch(saveVote(anecdote));
    dispatch(
      setAsyncNotification({
        message: `voted ${anecdote.content.slice(0, 10)}...`,
        time: 5,
      })
    );
  };
  return (
    <div>
      <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
      <div>
        {anecdote.votes} votes
        <button onClick={() => voteHandler(anecdote)}>vote</button>
      </div>
    </div>
  );
};

export default Anecdote;
