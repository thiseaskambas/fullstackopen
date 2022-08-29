import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import NewNoteForm from "./components/NewNoteForm";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      console.log({ initialNotes });
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((note) => (note.id !== id ? note : response)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();

    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      // id: notes.length + 1, let the server gen an id
    };

    noteService.create(noteObject).then((response) => {
      setNotes((prev) => [...prev, response]);
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      errorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user && (
        <div>
          <p>"{user.name}" is logged in</p>
        </div>
      )}
      {!user && (
        <LoginForm
          username={username}
          password={password}
          onUserChange={(e) => setUsername(e.target.value)}
          handleLogin={handleLogin}
          onPasswordChange={(e) => setPassword(e.target.value)}
        />
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      {user && (
        <NewNoteForm
          addNote={addNote}
          newNote={newNote}
          handleNoteChange={handleNoteChange}
        />
      )}
      <Footer />
    </>
  );
};

export default App;
