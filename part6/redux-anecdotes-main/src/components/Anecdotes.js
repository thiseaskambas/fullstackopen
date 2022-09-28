import { useSelector, useDispatch } from "react-redux";
import { saveVote } from "../reducers/anecdoteReducer";
import { setAsyncNotification } from "../reducers/notificationReducer";
import { selectFilter } from "../reducers/filterReducer";

const Anecdote = ({ anecdote, clickHandler }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        {anecdote.votes} votes
        <button onClick={clickHandler}>vote</button>
      </div>
    </div>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector(selectFilter);

  const anecdotesToShow = anecdotes.filter((el) =>
    el.content.toLowerCase().includes(filter.toLowerCase())
  );

  const dispatch = useDispatch();
  const voteHandler = (anecdote) => {
    dispatch(saveVote(anecdote));
    dispatch(
      setAsyncNotification({
        message: `voted ${anecdote.content.slice(0, 15)}...`,
        time: 5,
      })
    );
  };

  return (
    <div>
      {anecdotesToShow.map((anecdote) => (
        <Anecdote
          anecdote={anecdote}
          clickHandler={() => voteHandler(anecdote)}
          key={anecdote.id}
        />
      ))}
    </div>
  );
};

export default Anecdotes;
