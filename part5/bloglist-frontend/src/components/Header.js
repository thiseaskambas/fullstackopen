import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notify } from '../reducers/notificationSlice';
import { selectUser, logUserOut } from '../reducers/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logUserOut());
    dispatch(notify({ content: 'Logged out!', type: 'success' }, 5));
  };
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
      </nav>
      {user && (
        <>
          <h3>{user.name.toUpperCase()} is logged in</h3>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
      <Outlet />
    </>
  );
};

export default Header;
