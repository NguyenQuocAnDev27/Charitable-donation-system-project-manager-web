export interface User {
  userId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  createdAt: string;  // ISO string format for dates/times
  updatedAt: string;  // ISO string format for dates/times
  enabled: boolean;
}
