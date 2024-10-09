import { create } from 'zustand'
import { ProjectListResponse, ResponseState } from '@/interfaces'

interface ProjectState extends ResponseState<ProjectListResponse> {
  setProjectData: (data: ProjectListResponse | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSuccess: (success: boolean | null) => void
}

const useProjectStore = create<ProjectState>((set) => ({
  data: null,
  loading: false,
  error: null,
  success: null,
  setProjectData: (data) => set({ data }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setSuccess: (success) => set({ success }),
}))

export default useProjectStore
