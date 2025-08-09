// App.js
import React, { useState } from 'react';
import Login from './Login';
import Menu from './Menu';
import GenerateQuote from './GenerateQuote';
import QuoteList from './QuoteList';
import Favourites from './Favourites';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');

  const handleLogin = (name, email) => {
    setUser({ name, email });
    setPage('menu');
  };

  const handleLogout = () => {
    setUser(null);
    setPage('login');
  };

return (
  <div className="app">
    <div className="main-container">
      {page === 'login' && <Login onLogin={handleLogin} />}
      {page === 'menu' && <Menu setPage={setPage} user={user} />}
      {page === 'generate' && <GenerateQuote user={user} setPage={setPage} />}
      {page === 'list' && <QuoteList user={user} setPage={setPage} />}
      {page === 'favourites' && <Favourites user={user} setPage={setPage} />}
    </div>
  </div>
);

}

export default App;

