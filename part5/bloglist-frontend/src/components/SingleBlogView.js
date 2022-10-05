import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { commentBlog, likeBlog } from '../reducers/blogsSlice';
import { selectAllBlogs, deleteBlog } from '../reducers/blogsSlice';
import { selectUser } from '../reducers/userSlice';

const SingleBlogView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const blogs = useSelector(selectAllBlogs);
  const blog = blogs.find((el) => el.id === id);

  const handleLike = () => {
    try {
      dispatch(likeBlog(blog));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (blog) => {
    if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      try {
        dispatch(deleteBlog(blog));
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const content = e.target.comment.value;
    const res = await dispatch(commentBlog({ blog, content }));
    console.log({ res });
    e.target.comment.value = '';
  };

  return (
    <>
      <h1>{blog.title}</h1>
      <h2>Author : {blog.author}</h2>
      <div>UserName: {blog.user.name.toUpperCase()}</div>
      <div>
        Likes {blog.likes} <button onClick={handleLike}>like</button>
      </div>
      <div>
        {user.id === blog.user.id && (
          <button onClick={() => handleDelete(blog)}>Delete</button>
        )}
      </div>
      <div>
        <h3>Comments</h3>
        {blog.comments.length < 1 ? (
          <div>no comments yet</div>
        ) : (
          blog.comments.map((el) => <p key={el.id}>{el.content}</p>)
        )}
      </div>
      <form onSubmit={handleAddComment}>
        <p>Add comment</p>
        <input type="text" name="comment" />
        <button>submit</button>
      </form>
    </>
  );
};

export default SingleBlogView;
