export type UserRole =
  | "requester"
  | "technician"
  | "admin";
  
export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};