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
  // Always use the Railway API URL directly for production environments
  // This is more reliable than the Netlify proxy approach
  if (process.env.NODE_ENV === 'production' || 
      (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app'))) {
    console.log('Using Railway API URL directly');
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