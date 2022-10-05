import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../reducers/usersSlice';
import { useParams } from 'react-router-dom';

const User = () => {
  const users = useSelector(selectAllUsers);
  const { id } = useParams();
  const user = users.find((el) => el.id === id);
  console.log(user);
  return (
    <>
      <h2>{user.name}</h2>
      {user.blogs.map((el) => (
        <p key={el.id}>{el.title}</p>
      ))}
    </>
  );
};

export default User;
