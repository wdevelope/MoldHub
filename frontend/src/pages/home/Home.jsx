import React from 'react';
import Header from '../../components/Header';
import PostList from '../post/PostList';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow mt-20">
        <PostList />
      </main>
    </div>
  );
};

export default Home;
