import {Timestamp} from "@firebase/firestore";

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}