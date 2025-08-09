import React, { useState } from 'react';
import './login.css';

const Login = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(name, email);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>✨ Welcome to EnchantaQuotes ✨</h2>
        <p>Please enter your name and email to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
