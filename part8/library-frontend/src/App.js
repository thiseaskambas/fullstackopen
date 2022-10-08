import { useState } from "react";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import LogIn from "./components/LogIn";
import NewBook from "./components/NewBook";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token && <button onClick={() => setPage("add")}>add book</button>}
        {!token && <button onClick={() => setPage("login")}>LogIn</button>}
        {token && (
          <button onClick={() => setPage("recommended")}>Recommended</button>
        )}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommended show={page === "recommended"} />
      <LogIn show={page === "login"} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
