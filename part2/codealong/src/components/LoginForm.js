import PropTypes from 'prop-types';

const LoginForm = ({
  handleLogin,
  username,
  password,
  onUserChange,
  onPasswordChange,
}) => {
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username{' '}
          <input id="username" value={username} onChange={onUserChange} />
        </div>
        <div>
          password{' '}
          <input
            type="password"
            id="password"
            value={password}
            onChange={onPasswordChange}
          />
        </div>
        <div>
          <button id="login-button">Submit</button>
        </div>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  onUserChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
