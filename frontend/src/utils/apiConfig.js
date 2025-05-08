/**
 * API configuration utility
 * 
 * This utility provides a consistent way to access the API URL across the application.
 * It uses the environment to determine whether to use the production or development URL.
 */

// Use environment variable or fallback values
const RAILWAY_API_URL = process.env.REACT_APP_API_URL || "https://schmovies.up.railway.app";
const DEVELOPMENT_API_URL = "http://127.0.0.1:8000";

export const getApiBaseUrl = () => {
  // Check if we're running on Netlify
  if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
    // Use Netlify's redirect functionality as a proxy
    // This is defined in netlify.toml and will proxy requests to Railway
    // while adding proper CORS headers
    console.log('Running on Netlify, using Netlify proxy for API URL');
    return window.location.origin;
  } else if (process.env.NODE_ENV === 'production') {
    // For other production environments, use the Railway URL
    console.log('Running in production, using Railway API URL directly');
    return RAILWAY_API_URL;
  } else {
    // For development, use localhost
    console.log('Running in development, using local API URL');
    return DEVELOPMENT_API_URL;
  }
};

const apiConfig = {
  getApiBaseUrl
};

export default apiConfig;