/**
 * CORS Proxy utility
 * 
 * This utility provides a way to make API calls to endpoints that have CORS issues.
 * It uses a reliable public CORS proxy or adds additional headers to direct requests.
 */

// Our primary proxy for CORS-enabled requests
const PRIMARY_PROXY = 'https://proxy.cors.sh/';

// API key for cors.sh if needed (leave blank if not required)
const CORS_API_KEY = '';

/**
 * Makes a GET request to an API using CORS proxy or direct call with fallback
 * 
 * @param {string} url - The API URL to call
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} - The JSON response from the API
 */
export const fetchWithProxy = async (url, options = {}) => {
  console.log(`Fetching data from: ${url}`);
  
  // Define headers
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-cors-api-key': CORS_API_KEY,
    ...options.headers
  };
  
  try {
    // First try direct request with credentials: 'omit' to avoid CORS preflight
    console.log("Attempting direct API request");
    const directResponse = await fetch(url, {
      ...options,
      credentials: 'omit',
      mode: 'cors',
      headers
    });
    
    if (directResponse.ok) {
      const data = await directResponse.json();
      console.log("Direct API request successful");
      return data;
    }
    
    throw new Error(`Direct request failed with status: ${directResponse.status}`);
  } catch (directError) {
    console.warn("Direct request failed:", directError);
    
    // Try using the CORS proxy
    try {
      console.log(`Trying CORS proxy: ${PRIMARY_PROXY}${url}`);
      const proxyResponse = await fetch(`${PRIMARY_PROXY}${url}`, {
        ...options,
        headers: {
          ...headers,
          'Origin': 'https://schmovieslive.netlify.app'
        }
      });
      
      if (!proxyResponse.ok) {
        throw new Error(`Proxy request failed with status: ${proxyResponse.status}`);
      }
      
      const data = await proxyResponse.json();
      console.log("Proxy request successful");
      return data;
    } catch (proxyError) {
      console.error("CORS proxy request failed:", proxyError);
      throw proxyError;
    }
  }
};

/**
 * Makes a POST request to an API using CORS proxy or direct call with fallback
 * 
 * @param {string} url - The API URL to call
 * @param {Object} data - The data to send
 * @param {Object} options - Additional fetch options
 * @returns {Promise<any>} - The JSON response from the API
 */
export const postWithProxy = async (url, data, options = {}) => {
  console.log(`Posting data to: ${url}`);
  
  // Define headers
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'x-cors-api-key': CORS_API_KEY,
    ...options.headers
  };
  
  try {
    // First try direct request
    console.log("Attempting direct API POST request");
    const directResponse = await fetch(url, {
      ...options,
      method: 'POST',
      credentials: 'omit',
      mode: 'cors',
      headers,
      body: JSON.stringify(data)
    });
    
    if (directResponse.ok) {
      const responseData = await directResponse.json();
      console.log("Direct API POST request successful");
      return responseData;
    }
    
    throw new Error(`Direct POST request failed with status: ${directResponse.status}`);
  } catch (directError) {
    console.warn("Direct POST request failed:", directError);
    
    // Try using the CORS proxy
    try {
      console.log(`Trying CORS proxy for POST: ${PRIMARY_PROXY}${url}`);
      const proxyResponse = await fetch(`${PRIMARY_PROXY}${url}`, {
        ...options,
        method: 'POST',
        headers: {
          ...headers,
          'Origin': 'https://schmovieslive.netlify.app'
        },
        body: JSON.stringify(data)
      });
      
      if (!proxyResponse.ok) {
        throw new Error(`Proxy POST request failed with status: ${proxyResponse.status}`);
      }
      
      const responseData = await proxyResponse.json();
      console.log("Proxy POST request successful");
      return responseData;
    } catch (proxyError) {
      console.error("CORS proxy POST request failed:", proxyError);
      throw proxyError;
    }
  }
};

export default {
  fetchWithProxy,
  postWithProxy
};