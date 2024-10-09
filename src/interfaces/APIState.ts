import { ResponseState } from "./ResponseState";

export interface APIState<T> extends ResponseState<T> {
    setData: (data: T | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSuccess: (success: boolean | null) => void;
  }