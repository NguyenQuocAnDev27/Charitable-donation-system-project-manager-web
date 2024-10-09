import { ProjectDetails } from "./ProjectDetails";

export interface ProjectListResponse {
    totalPages: number;
    currentPage: number;
    list: ProjectDetails[];
  }