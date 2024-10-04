const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
  
    const defaultHeaders: { 'Content-Type'?: string; 'Authorization'?: string } = {
    };
  
    const token = localStorage.getItem('token');
    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }
  
    options.headers = {
      ...defaultHeaders,
      ...options.headers,
    };
  
    const url = `${baseURL}${endpoint}`;
  
    const response = await fetch(url, options);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    return response.json();
  };
  

export default fetchAPI;
