import { useState, useEffect } from 'react';

const useFetch = (endpoint: string, options: RequestInit = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchAPI(endpoint, options);
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message || 'Something went wrong');
        } else {
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options]);

  return { data, loading, error };
};

const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
    const baseURL = "http://localhost:3000/api";
  
    const defaultHeaders: { 'Content-Type': string; 'Authorization'?: string } = {
      'Content-Type': 'application/json',
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
  

export default useFetch;
