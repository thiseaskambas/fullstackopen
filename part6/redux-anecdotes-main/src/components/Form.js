import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setAsyncNotification } from "../reducers/notificationReducer";
import { useField } from "../hooks/index";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const input = useField("text");

  const addNewAnecdote = async (e) => {
    e.preventDefault();

    //NOTE:  it is not great to communicate with the server from inside the functions of the components !
    // eg const newAnecdote = await appServices.createNew(
    //   e.target["new-anecdote"].value
    // ); INSTEAD dispatch to the state manager:

    // dispatch(createAnecdote(e.target["new-anecdote"].value));
    dispatch(createAnecdote(input.value));
    // e.target["new-anecdote"].value = "";
    dispatch(
      setAsyncNotification({
        message: `added ${input.value.slice(0, 10)}...`,
        time: 5,
      })
    );
    input.reset();
    navigate("/");
  };

  return (
    <form onSubmit={addNewAnecdote}>
      <div>
        <input {...input} />
      </div>
      <button type="submit">create</button>
      <button type="button" onClick={() => input.reset()}>
        clear
      </button>
    </form>
  );
};

export default Form;
