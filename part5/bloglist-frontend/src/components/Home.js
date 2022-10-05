import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from '../components/Blog';
import Notification from '../components/Notification';
import LoginForm from '../components/LoginForm';
import NewBlogForm from '../components/NewBlogForm';
import Togglable from '../components/Togglable';

import { initializeUsers, getUsersStatus } from '../reducers/usersSlice';
import {
  initializeBlogs,
  selectAllBlogs,
  getBlogsStatus,
  deleteBlog,
} from '../reducers/blogsSlice';
import {
  findUserFromToken,
  selectUser,
  getUserStatus,
} from '../reducers/userSlice';

const Home = () => {
  console.log('HOME RENDER');
  const dispatch = useDispatch();
  const blogs = useSelector(selectAllBlogs);
  const user = useSelector(selectUser);
  const userStatus = useSelector(getUserStatus);
  const blogsStatus = useSelector(getBlogsStatus);
  const usersStatus = useSelector(getUsersStatus);

  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    console.log('first run for user');
    if (userStatus === 'idle') {
      dispatch(findUserFromToken());
    }
  }, []);

  useEffect(() => {
    console.log('first run for data');
    if (
      userStatus === 'succeeded' &&
      usersStatus === 'idle' &&
      blogsStatus === 'idle'
    ) {
      dispatch(initializeBlogs());
      dispatch(initializeUsers());
    }
  }, [userStatus]);

  const handleDelete = async (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      {notification.content && <Notification notification={notification} />}

      <h1>blogs</h1>
      {!user && (
        <Togglable label="Log-in">
          <LoginForm />
        </Togglable>
      )}

      {user &&
        blogs
          .slice()
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
          <NewBlogForm />
        </Togglable>
      )}
    </div>
  );
};

export default Home;
