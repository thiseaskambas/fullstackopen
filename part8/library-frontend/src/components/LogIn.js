import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const LogIn = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [logIn, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error);
    },
  });
  useEffect(() => {
    if (result.data) {
      const token = result.data.logIn.value;
      setToken(token);
      localStorage.setItem("library-app", token);
    }
  }, [result.data]); //eslint-disable-line

  if (!show) {
    return null;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    logIn({ variables: { username, password } });
    setPage("authors");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        username
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>LogIn</button>
    </form>
  );
};

export default LogIn;
