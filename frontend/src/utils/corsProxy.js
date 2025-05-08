/**
 * CORS Proxy utility
 * 
 * This utility provides a way to make API calls to endpoints that have CORS issues.
 * It routes requests through public CORS proxies that add the necessary headers.
 */

// List of public CORS proxies to try
const CORS_PROXIES = [
  'https://corsproxy.io/?',
  'https://cors-anywhere.herokuapp.com/',
  'https://api.allorigins.win/raw?url=',
];

/**
 * Creates a proxied URL by adding a CORS proxy in front of the original URL
 * Tries multiple proxies in order if specified
 * 
 * @param {string} url - The original URL to proxy
 * @param {number} proxyIndex - Index of proxy to use (defaults to 0)
 * @returns {string} The proxied URL
 */
export const createProxiedUrl = (url, proxyIndex = 0) => {
  // Make sure we don't exceed the available proxies
  const safeIndex = proxyIndex % CORS_PROXIES.length;
  
  // For the allorigins proxy, we need to encode the URL
  if (CORS_PROXIES[safeIndex].includes('allorigins')) {
    return `${CORS_PROXIES[safeIndex]}${encodeURIComponent(url)}`;
  }
  
  // For other proxies, we can just concatenate
  return `${CORS_PROXIES[safeIndex]}${url}`;
};

/**
 * Fetch data from a URL using a CORS proxy
 * Automatically tries multiple proxies if one fails
 * 
 * @param {string} url - The original URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<any>} - Resolves to the fetched data (parsed JSON)
 */
export const fetchWithProxy = async (url, options = {}) => {
  // Try each proxy in order
  for (let i = 0; i < CORS_PROXIES.length; i++) {
    try {
      const proxiedUrl = createProxiedUrl(url, i);
      console.log(`Trying proxy ${i + 1}/${CORS_PROXIES.length}: ${proxiedUrl}`);
      
      const response = await fetch(proxiedUrl, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.warn(`Proxy ${i + 1} failed:`, error);
      
      // If this is the last proxy, rethrow the error
      if (i === CORS_PROXIES.length - 1) {
        throw error;
      }
      // Otherwise try the next proxy
    }
  }
};

export default {
  createProxiedUrl,
  fetchWithProxy
};