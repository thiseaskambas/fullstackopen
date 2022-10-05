import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';
import Header from './components/Header';
function App() {
  //NOTE: LIFT STATE HERE MAYBE

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blogs/:id" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
