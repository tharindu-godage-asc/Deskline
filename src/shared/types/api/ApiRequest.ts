export type ApiRequest = {
  id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
  requesterId: string;
  assigneeId: string | null;
  createdAt: string;
  updatedAt: string;
};