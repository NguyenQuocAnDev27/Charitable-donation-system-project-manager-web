import { create } from 'zustand'
import { APIState } from '@/interfaces'

// Create a generic Zustand hook to manage the API state
function createAPIState<T>() {
  return create<APIState<T>>((set) => ({
    data: null,
    loading: false,
    error: null,
    success: null,
    setData: (data) => set({ data }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    setSuccess: (success) => set({ success }),
  }))
}

export default createAPIState
