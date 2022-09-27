import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import NewBlogForm from './components/NewBlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const fetchBlogs = async () => {
    const fetchedBlogs = await blogService.getAll();
    setBlogs(fetchedBlogs);
  };

  useEffect(() => {
    if (user) {
      try {
        fetchBlogs();
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  const handleLogin = async (userToSave) => {
    try {
      const loggedUser = await blogService.logIn(userToSave);
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser)
      );
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);

      setNotification({ message: 'Logged In', type: 'success' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      setNotification({ message: 'Wrong credentials', type: 'error' });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    setUser(null);
    setNotification({ message: 'Logged Out', type: 'success' });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const saveBlog = async (blogToSave) => {
    const saved = await blogService.createBlog(blogToSave);
    setBlogs([...blogs, saved]);
    setNotification({
      message: `A new Blog "${saved.title}" was added`,
      type: 'success',
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleDelete = async (blog) => {
    // if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
    try {
      await blogService.deleteBlog(blog.id);
      setBlogs(blogs.filter((el) => el.id !== blog.id));
    } catch (err) {
      console.log(err);
    }
    // }
  };

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h1>blogs</h1>
      {!user && (
        <Togglable label="Log-in">
          <LoginForm handleLogin={handleLogin} />
        </Togglable>
      )}

      {user && (
        <>
          <h3>{user.name.toUpperCase()} is logged in</h3>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
      {user &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleDelete={handleDelete}
            />
          ))}
      {user && (
        <Togglable label="Add new blog" id="new-blog-btn">
          <NewBlogForm saveBlog={saveBlog} />
        </Togglable>
      )}
    </div>
  );
};

export default App;
