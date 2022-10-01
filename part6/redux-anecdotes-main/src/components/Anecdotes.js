import { useSelector } from "react-redux";
import { selectFilter } from "../reducers/filterReducer";
import Anecdote from "./Anecdote";

const Anecdotes = () => {
  const filter = useSelector(selectFilter);
  const anecdotes = useSelector((state) => state.anecdotes);
  const anecdotesToShow = anecdotes.filter((el) =>
    el.content.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {anecdotesToShow.map((anecdote) => (
        <Anecdote anecdote={anecdote} key={anecdote.id} />
      ))}
    </div>
  );
};

export default Anecdotes;
