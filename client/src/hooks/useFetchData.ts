import { useCallback, useEffect, useState } from "react";

type UseFetchDataOptions = RequestInit & {
  queryParameters?: {
    [key: string]: string;
  };
};

type UseFetchDataReturnType<TData> = {
  data?: TData;
  loading: boolean;
  errors: Error[];
  refetch: () => void;
};

export const useFetchData = <TData>(url: string, options?: UseFetchDataOptions): UseFetchDataReturnType<TData> => {
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Error[]>([]);

  const prepareUrl = useCallback(() => {
    if (!options?.queryParameters) {
      return url;
    }
    const params = new URLSearchParams(options.queryParameters).toString();
    return `${url}?${params}`;
  }, [url, options?.queryParameters]);

  const refetch = useCallback(() => {
    setLoading(true);
    setErrors([]);
  }, []);

  useEffect(() => {
    const url = prepareUrl();

    fetch(url, options)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Status code : ${response.status}`);
        }
      })
      .then(setData)
      .catch((reason) => {
        if (reason instanceof Error) {
          setErrors((prev) => [...prev, reason]);
        }
      })
      .finally(() => setLoading(false));
  }, [prepareUrl, options, loading]);

  return {
    data,
    loading,
    errors,
    refetch,
  };
};
