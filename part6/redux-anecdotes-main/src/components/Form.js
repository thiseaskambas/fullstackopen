import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import appServices from "../services/anecdotes";

const Form = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (e) => {
    e.preventDefault();
    //TODO:  it is not great that the communication with the server happens inside the functions of the components !
    // const newAnecdote = await appServices.createNew(
    //   e.target["new-anecdote"].value
    // );
    dispatch(createAnecdote(e.target["new-anecdote"].value));
    e.target["new-anecdote"].value = "";
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
