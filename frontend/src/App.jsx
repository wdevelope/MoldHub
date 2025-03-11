import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home/Home';
import PostDetail from './pages/post/PostDetail';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import SubmitEstimate from './pages/post/SubmitEstimate';
import CreatePost from './pages/post/CreatePost';
import QuotesList from './pages/post/QuotesList';
import AdminActions from './pages/post/AdminActions';
import MyPage from './pages/user/MyPage';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/post/:id/submit" element={<SubmitEstimate />} />
        <Route path="/post/:id/quotes" element={<QuotesList />} />
        <Route path="/post/:id/admin-actions" element={<AdminActions />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={1000} // 1초
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
};

export default App;
