import { useEffect, useState } from 'react';
import { ApiEndpoint } from '../config';
import req from '../utils/req';

const useApi = <T, Q = unknown>(endpoint: ApiEndpoint, query?: Q) => {
  const [data, setData] = useState<T>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await req<T, Q>(endpoint, query);
        setData(response);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [endpoint, query]);

  return { data, isLoading, isError };
};

export default useApi;