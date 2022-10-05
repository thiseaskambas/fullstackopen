import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';

// import { initializeBlogs } from './reducers/blogsSlice';
// import { initializeUsers } from './reducers/usersSlice';
// import { findUserFromToken } from './reducers/userSlice';

// store.dispatch(initializeBlogs());
// store.dispatch(initializeUsers());
// store.dispatch(findUserFromToken());

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
