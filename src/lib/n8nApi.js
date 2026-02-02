// n8n API utility for backend communication

const BASE_URL = import.meta.env.VITE_N8N_BASE_URL || '';

/**
 * Call n8n endpoint with optional POST body
 * @param {string} endpoint - The endpoint path (e.g., '/get-stores')
 * @param {object} body - Optional POST body
 * @returns {Promise<any>} - The JSON response
 */
export const callN8n = async (endpoint, body = null) => {
  const url = `${BASE_URL}${endpoint}`;
  
  const options = {
    method: body ? 'POST' : 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

/**
 * Fetch all stores from n8n backend
 * @returns {Promise<Array>} - Array of store objects
 */
export const fetchStores = async () => {
  return callN8n('/get-stores');
};

/**
 * Fetch reviews for a specific store
 * @param {string} storeId - The store ID ('all' or numeric string)
 * @returns {Promise<Array>} - Array of review objects
 */
export const fetchReviews = async (storeId) => {
  return callN8n('/fetch-reviews', { store_id: storeId });
};
