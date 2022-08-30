import { useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog, user, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const label = visible ? "hide" : "show";
  const handleLike = async () => {
    try {
      const tempLikes = likes + 1;
      await blogServices.like(blog.id, tempLikes);
      setLikes(likes + 1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="blog-box">
      Title : {blog.title}{" "}
      <button onClick={() => setVisible((prev) => !prev)}>{label}</button>
      {visible && (
        <>
          <div>Author : {blog.author}</div>
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
