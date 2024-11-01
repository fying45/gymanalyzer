import { useCallback, useEffect, useMemo, useState } from "react";

type UseFetchDataOptions<TParams> = RequestInit & {
  queryParameters?: TParams & {
    [key: string]: string;
  };
};

type UseFetchDataReturnType<TData> = {
  data?: TData;
  loading: boolean;
  errors: Error[];
  refetch: () => void;
};

export const useFetchData = <TData, TParams = Record<string, string>>(
  url: string,
  options?: UseFetchDataOptions<TParams>
): UseFetchDataReturnType<TData> => {
  const [data, setData] = useState<TData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<Error[]>([]);
  const [shouldRefetch, setShouldRefetch] = useState<boolean>(true);

  const preparedUrl = useMemo(() => {
    if (!options?.queryParameters) {
      return url;
    }
    const params = new URLSearchParams(options.queryParameters).toString();
    return `${url}?${params}`;
  }, [url, options?.queryParameters]);

  const refetch = useCallback(() => {
    setLoading(true);
    setErrors([]);
    setShouldRefetch(true);
  }, []);

  useEffect(() => {
    if (!shouldRefetch) return;
    setShouldRefetch(false);

    fetch(preparedUrl, options)
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
  }, [preparedUrl, options, shouldRefetch]);

  return {
    data,
    loading,
    errors,
    refetch,
  };
};
