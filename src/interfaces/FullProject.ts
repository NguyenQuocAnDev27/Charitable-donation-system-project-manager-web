import { ProjectManager } from "./ProjectManager";

export interface FullProject {
    projectId: number;
    projectName: string;
    description: string;
    goalAmount: number;
    currentAmount: number;
    startDate: Date;
    endDate: Date;
    status: string;
    projectManager: ProjectManager;
}