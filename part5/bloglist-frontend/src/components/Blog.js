const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} {blog.user.name.toUpperCase()}
  </div>
);

export default Blog;
