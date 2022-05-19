import { loadavg } from "os";
import { useState } from "react";

type useMutaionResult<T> = [(data?: any) => void, UseMutaionState<T>];

interface UseMutaionState<T> {
  data?: T;
  error?: object;
  loading: boolean;
}

export default function useMutaion<T = any>(url: string): useMutaionResult<T> {
  const [state, setState] = useState<UseMutaionState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data?: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return [mutation, { ...state }];
}
