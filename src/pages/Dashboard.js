import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';
import './Dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin', { replace: true });
  };

  React.useEffect(() => {
    // Replace the current entry in the history stack
    navigate('/dashboard', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
          <p className="text-gray-700">Here you can manage your account and view your data.</p>
          <div className="emoji-container">
            <span className="emoji">😉</span>
            <p className="message">You are cute!</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
