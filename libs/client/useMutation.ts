import { loadavg } from "os";
import { useState } from "react";

type useMutaionResult = [(data?: any) => void, UseMutaionState];

interface UseMutaionState {
  data?: object;
  error?: object;
  loading: boolean;
}

export default function useMutaion(url: string): useMutaionResult {
  const [state, setState] = useState<UseMutaionState>({
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
