import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import PostDetail from './pages/post/PostDetail';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import SubmitEstimate from './pages/post/SubmitEstimate';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/:id/submit" element={<SubmitEstimate />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
