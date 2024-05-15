import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const csrfTokenMetaTag = document.querySelector('meta[name="csrf-token"]');
    if (csrfTokenMetaTag) {
      console.log('CSRF token meta tag found:', csrfTokenMetaTag.getAttribute('content'));
    } else {
      console.error('CSRF token meta tag not found');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const csrfTokenMetaTag = document.querySelector('meta[name="csrf-token"]');
      const csrftoken = csrfTokenMetaTag ? csrfTokenMetaTag.getAttribute('content') : null;
      
      if (!csrftoken) {
        throw new Error('CSRF token not found');
      }

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
      console.error(err);
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