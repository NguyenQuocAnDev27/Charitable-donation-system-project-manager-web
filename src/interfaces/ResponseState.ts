export interface ResponseState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  success: boolean | null;
}