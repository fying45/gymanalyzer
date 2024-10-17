import { useEffect, useState } from "react";

type UseFetchDataOptions = RequestInit & {
  queryParameters?: {
    [key: string]: string;
  };
};

type UseFetchDataReturnType<TData> = {
  data?: TData;
  loading: boolean;
  errors: Error[];
};

export const useFetchData = <TData>(url: string, options?: UseFetchDataOptions): UseFetchDataReturnType<TData> => {
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Error[]>([]);

  if (options?.queryParameters) {
    const params = new URLSearchParams();

    Object.entries(options.queryParameters).forEach(([key, value]) => {
      params.append(key, value);
    });

    url = url.concat("?", params.toString());
    console.log(url);
  }

  useEffect(() => {
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
  }, []);

  return {
    data,
    loading,
    errors,
  };
};
