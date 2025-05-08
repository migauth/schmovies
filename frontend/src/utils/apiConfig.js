/**
 * API configuration utility
 * 
 * This utility provides a consistent way to access the API URL across the application.
 * It uses the environment to determine whether to use the production or development URL.
 */

// Use environment variable or fallback values
const PRODUCTION_API_URL = process.env.REACT_APP_API_URL || "https://schmovies.up.railway.app";
const DEVELOPMENT_API_URL = "http://127.0.0.1:8000";

export const getApiBaseUrl = () => {
  // In Netlify environment, always use the Railway URL regardless of NODE_ENV
  if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
    console.log('Running on Netlify, using Railway API URL');
    return PRODUCTION_API_URL;
  }
  
  // Otherwise use environment-based URL
  return process.env.NODE_ENV === 'production' 
    ? PRODUCTION_API_URL 
    : DEVELOPMENT_API_URL;
};

const apiConfig = {
  getApiBaseUrl
};

export default apiConfig;