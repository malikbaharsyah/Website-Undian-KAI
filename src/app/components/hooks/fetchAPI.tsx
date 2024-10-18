import { useRouter } from "next/navigation";

const useFetchAPI = () => {
  const router = useRouter();

  const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
    const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

    const defaultHeaders: { 'Content-Type'?: string; 'Authorization'?: string } = {};

    options.headers = {
      ...defaultHeaders,
      ...options.headers,
    };

    options.credentials = 'include';

    const url = `${baseURL}${endpoint}`;

    const response = await fetch(url, options);

    if (response.status === 401 || response.status === 403) {
      router.push('/login');
      return;
    }

    return response.json();
  };

  return fetchAPI;
};

export default useFetchAPI;
