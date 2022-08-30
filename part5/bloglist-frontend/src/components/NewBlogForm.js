import { useState } from "react";

const NewBlogForm = ({ saveBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogUrl, setBlogUrl] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");

  const handleAddBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: blogTitle,
      url: blogUrl,
      author: blogAuthor,
    };
    saveBlog(newBlog);
    setBlogTitle("");
    setBlogUrl("");
    setBlogAuthor("");
  };

  return (
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
        <input value={blogUrl} onChange={(e) => setBlogUrl(e.target.value)} />
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
  );
};

export default NewBlogForm;
