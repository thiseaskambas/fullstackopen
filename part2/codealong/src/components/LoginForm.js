const LoginForm = ({
  handleLogin,
  username,
  password,
  onUserChange,
  onPasswordChange,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        username <input value={username} onChange={onUserChange} />
      </div>
      <div>
        password{" "}
        <input type="password" value={password} onChange={onPasswordChange} />
      </div>
      <div>
        <button>LogIn</button>
      </div>
    </form>
  );
};
export default LoginForm;
