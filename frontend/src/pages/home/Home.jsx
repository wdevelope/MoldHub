import React from 'react';
import { Link } from 'react-router-dom';
import PostList from '../post/PostList';
import Button from '../../components/Button';
import useAuthStore from '../../store/authStore';

const Home = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow mt-10">
        {user && user.status === 'ORDERER' && (
          <div className="flex justify-end mb-4 px-6">
            <Link to="/create-post">
              <Button variant="primary">금형제작 요청</Button>
            </Link>
          </div>
        )}
        <PostList />
      </main>
    </div>
  );
};

export default Home;
