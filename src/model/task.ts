export interface Task {
  _id?: string;
  title: string;
  description: string;
  completed_at?: Date | null;
  created_at?: Date;
  updated_at?: Date;
}
