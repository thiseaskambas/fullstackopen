import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Form = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = (e) => {
    e.preventDefault();
    const newAnecdote = e.target["new-anecdote"].value;
    e.target["new-anecdote"].value = "";
    dispatch(addAnecdote(newAnecdote));
    dispatch(setNotification("Added !"));
    setTimeout(() => {
      dispatch(setNotification(null));
    }, 5000);
  };

  return (
    <form onSubmit={addNewAnecdote}>
      <div>
        <input name="new-anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default Form;
