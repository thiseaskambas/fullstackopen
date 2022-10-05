import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../reducers/usersSlice';

const Users = () => {
  const users = useSelector(selectAllUsers);
  return (
    <>
      <h1>users</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            <Link to={('/users/', user.id)}>{user.name}</Link> has{' '}
            {user.blogs.length} blogs
          </p>
        </div>
      ))}
    </>
  );
};

export default Users;
