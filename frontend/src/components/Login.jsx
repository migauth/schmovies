import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const csrfTokenElement = document.getElementById('csrf_token');
    if (csrfTokenElement) {
      setCsrfToken(csrfTokenElement.value);
    } else {
      console.error('CSRF token element not found');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (!csrfToken) {
        throw new Error('CSRF token is missing');
      }
      console.log('CSRF Token:', csrfToken);

      const response = await axios.post(
        'http://localhost:3000/accounts/login/',
        { username, password },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );

      console.log('Response:', response);

      if (response.status === 200) {
        onLoginSuccess(response.data);
      } else {
        setError('Unexpected response status: ' + response.status);
      }
    } catch (err) {
      console.error('Login error:', err);
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>
        <a href="/accounts/password-reset/">Lost password?</a>
      </p>
    </div>
  );
};

export default Login;