const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
  
    const defaultHeaders: { 'Content-Type'?: string; 'Authorization'?: string } = {
    };
  
    options.headers = {
      ...defaultHeaders,
      ...options.headers,
    };
  
    const url = `${baseURL}${endpoint}`;
  
    const response = await fetch(url, options);
    
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      throw new Error('Unauthorized access. Redirecting to login.');
    }
  
    return response.json();
  };
  

export default fetchAPI;
