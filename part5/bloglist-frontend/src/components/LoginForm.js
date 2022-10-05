import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logUserIn } from '../reducers/userSlice';
import { notify } from '../reducers/notificationSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(logUserIn({ username, password }))
      .unwrap()
      .then(() => {
        dispatch(notify({ content: 'Logged in!', type: 'success' }, 5));
      })
      .catch((err) => {
        dispatch(notify({ content: 'Wrong credentials!', type: 'error' }, 5));
        console.log({ err });
      });
    setPassword('');
    setUsername('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:{' '}
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        password:{' '}
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button id="login-button">Submit</button>
      </div>
    </form>
  );
};

export default LoginForm;
