import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Home = () => {
  const navigate = useNavigate()
  const { user, handleLogout, loading } = useAuth();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.message);
    }
  }

  if (loading) {
    return <main><h2>Loading...</h2></main>
  }

  return (
    <main>
      <div className="home-container">
        <header className="home-header">
          <h1>Welcome, {user?.username || 'User'}!</h1>
          <button className="button primary-button" onClick={handleLogoutClick}>
            Logout
          </button>
        </header>
      </div>
    </main>
  )
}

export default Home