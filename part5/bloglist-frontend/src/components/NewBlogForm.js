import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveBlog } from '../reducers/blogsSlice';

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const [blogTitle, setBlogTitle] = useState('');
  const [blogUrl, setBlogUrl] = useState('');
  const [blogAuthor, setBlogAuthor] = useState('');

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: blogTitle,
      url: blogUrl,
      author: blogAuthor,
    };
    dispatch(saveBlog(newBlog));
    setBlogTitle('');
    setBlogUrl('');
    setBlogAuthor('');
  };

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        title :{' '}
        <input
          id="blog-title"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
        />
      </div>
      <div>
        URL :{' '}
        <input
          id="blog-url"
          value={blogUrl}
          onChange={(e) => setBlogUrl(e.target.value)}
        />
      </div>
      <div>
        Author :{' '}
        <input
          id="blog-author"
          value={blogAuthor}
          onChange={(e) => setBlogAuthor(e.target.value)}
        />
      </div>
      <div>
        <button className="submitBtn">Submit</button>
      </div>
    </form>
  );
};

export default NewBlogForm;
