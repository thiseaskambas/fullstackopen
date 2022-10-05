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
        {user && (
          <>
            <span>{user.name.toUpperCase()} is logged in</span>
            <button onClick={handleLogout}>logout</button>
          </>
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default Header;
