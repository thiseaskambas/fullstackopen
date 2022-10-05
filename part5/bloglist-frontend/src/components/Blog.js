import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeBlog } from '../reducers/blogsSlice';

const Blog = ({ blog, user, handleDelete }) => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const label = visible ? 'hide' : 'show';

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog));
      setLikes(likes + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="blog-box">
      <div>Title : {blog.title} </div>
      <div>Author : {blog.author}</div>
      <button onClick={() => setVisible((prev) => !prev)}>{label}</button>
      {visible && (
        <>
          <div>UserName: {blog.user.name.toUpperCase()}</div>
          <div>
            Likes {likes} <button onClick={handleLike}>like</button>
          </div>
          <div>
            {user.id === blog.user.id && (
              <button onClick={() => handleDelete(blog)}>Delete</button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Blog;
