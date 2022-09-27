import { useState, useEffect, useRef } from 'react';
//NOTE: When you want a component to “remember” some information,
//but you don’t want that information to trigger new renders, you can use a ref.
import Note from './components/Note';
import noteService from './services/notes';
import loginService from './services/login';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import NewNoteForm from './components/NewNoteForm';
import Togglable from './components/Togglable';
import Notification from './components/Notification';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();
  useEffect(() => {
    noteService
      .getAll()
      .then((initialNotes) => {
        setNotes(initialNotes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
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
      .catch(() => {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const saveNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();
    noteService.create(noteObject).then((response) => {
      setNotes((prev) => [...prev, response]);
    });
  };

  return (
    <>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user && (
        <div>
          <p>&quot;{user.name}&quot; is logged in</p>
        </div>
      )}
      {!user && (
        <Togglable buttonLabel={'login'}>
          <LoginForm
            username={username}
            password={password}
            onUserChange={(e) => setUsername(e.target.value)}
            handleLogin={handleLogin}
            onPasswordChange={(e) => setPassword(e.target.value)}
          />
        </Togglable>
      )}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
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
        <Togglable buttonLabel="Add new note" ref={noteFormRef}>
          <NewNoteForm saveNote={saveNote} />
        </Togglable>
      )}
      <Footer />
    </>
  );
};

export default App;
