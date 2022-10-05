import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
  return (
    <div className="blog-box">
      <Link to={`/blogs/${blog.id}`}>Title : {blog.title} </Link>
      <div>Author : {blog.author}</div>
    </div>
  );
};
export default Blog;
