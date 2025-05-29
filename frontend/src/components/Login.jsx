import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.scss';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://schmovies-cc8d8692549b.herokuapp.com/users/login/',
        { username, password }
      );

      console.log('response here', response);

      if (response.status === 200) {
        onLoginSuccess(response.data.user);
      }
    } catch (err) {
      setError("Your username and password didn't match. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      {error && <p className="login-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="input-label">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="input-label">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button"> Login </button>
      </form>
    </div>
  );
};

export default Login;
