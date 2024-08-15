export default interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
