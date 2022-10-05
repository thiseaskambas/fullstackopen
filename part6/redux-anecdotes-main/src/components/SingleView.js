import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function SingleView() {
  const anecdotes = useSelector((state) => state.anecdotes);
  const id = useParams().id;
  const anecdote = anecdotes.find((el) => el.id === id);
  return (
    <div>
      <h1>Single view</h1>
      <p>{anecdote.content}</p>
      <p>has {anecdote.votes} votes</p>
    </div>
  );
}

export default SingleView;
