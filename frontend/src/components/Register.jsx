import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Register.scss'; // Import the SCSS file


const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false); // New state to track registration status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Add this console log
    try {
      const response = await axios.post('http://127.0.0.1:8000/users/register/', formData);
      console.log('Registration successful:', response.data);
      setRegistered(true);
      window.location = '/'; // Redirect to the home page

 
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      {error && <p className="register-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="input-label" htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="input-label" htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="input-label" htmlFor="password1">Password:</label>
          <input
            type="password"
            id="password1"
            name="password1"
            value={formData.password1}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="input-label" htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            id="password2"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            required
          />
        </div>
        <button className="submit-button" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
