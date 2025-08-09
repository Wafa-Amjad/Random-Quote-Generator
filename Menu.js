import React from 'react';
import './Menu.css';

const Menu = ({ setPage, user, setUser }) => {
  const handleLogout = () => {
    if (typeof setUser === 'function') {
      setUser(null);
      setPage('login');
    } else {
      console.error('setUser is not a function');
    }
  };

  return (
    <div className="menu-container">
      <div className="menu-card">
        <h2>Hello, {user?.name || 'User'} 👋</h2>
        <p>Ready to explore your favorite quotes?</p>

        <div className="menu-buttons">
          <button onClick={() => setPage('generate')}>🎲 Generate Quote</button>
          <button onClick={() => setPage('list')}>📜 Quote List</button>
          <button onClick={() => setPage('favourites')}>❤️ Favourites</button>
        </div>

        <div className="logout-container">
          <button className="logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menu;
