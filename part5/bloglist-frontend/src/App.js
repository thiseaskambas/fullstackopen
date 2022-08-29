import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loggedUser = await blogService.logIn({ username, password });
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(loggedUser)
      );
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      setPassword("");
      setUsername("");
      setNotification({ message: "Logged In", type: "success" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    } catch (err) {
      setNotification({ message: "Wrong credentials", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
    setNotification({ message: "Logged Out", type: "success" });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const newBlog = await blogService.createBlog({
      title: blogTitle,
      url: blogUrl,
      author: blogAuthor,
    });
    console.log(newBlog);
    setBlogs([...blogs, newBlog]);
    setBlogTitle("");
    setBlogUrl("");
    setBlogAuthor("");
    setNotification({
      message: `A new Blog "${blogTitle}" was added`,
      type: "success",
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      {notification && <Notification notification={notification} />}
      <h1>blogs</h1>
      {!user && (
        <form onSubmit={handleLogin}>
          <div>
            username:{" "}
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button>login</button>
          </div>
        </form>
      )}
      {}
      {user && (
        <>
          <h3>{user.name.toUpperCase()} is logged in</h3>
          <button onClick={handleLogout}>logout</button>
        </>
      )}
      {user && blogs.map((blog) => <Blog key={blog.id} blog={blog} />)}
      {user && (
        <form onSubmit={handleAddBlog}>
          <div>
            title :{" "}
            <input
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
            />
          </div>
          <div>
            URL :{" "}
            <input
              value={blogUrl}
              onChange={(e) => setBlogUrl(e.target.value)}
            />
          </div>
          <div>
            Author :{" "}
            <input
              value={blogAuthor}
              onChange={(e) => setBlogAuthor(e.target.value)}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default App;
