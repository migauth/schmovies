import React, { useState } from 'react';
import axios from 'axios';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const csrftoken = getCookie('csrftoken');

      const response = await axios.post(
        'http://localhost:8000/accounts/login/',
        { username, password },
        {
          headers: {
            'X-CSRFToken': csrftoken,
          },
        }
      );
      
      if (response.status === 200) {
        onLoginSuccess(response.data);
      }
    } catch (err) {
      setError("Your username and password didn't match. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Login'}</button>
      </form>
      <p>
        <a href="/accounts/password-reset/">Lost password?</a>
      </p>
    </div>
  );
};

export default Login;