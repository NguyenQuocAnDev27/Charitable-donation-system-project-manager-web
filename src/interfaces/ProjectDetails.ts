import { OverviewProject } from "./OverviewProject";

export interface ProjectDetails extends Omit<OverviewProject, 'created_day' | 'expired_day' | 'project_id' | 'project_name' | 'goal_amount' | 'current_amount'> {
    projectId: number;
    projectName: string;
    goalAmount: number;
    currentAmount: number;
    startDate: Date;
    endDate: Date;
    status: string;
  }