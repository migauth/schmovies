import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/users/login/',
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
        <button type="submit"> Login </button>
      </form>
      <p>
        <a href="/accounts/password-reset/">Lost password?</a>
      </p>
    </div>
  );
};

export default Login;
