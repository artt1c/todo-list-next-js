import {Timestamp} from "@firebase/firestore";

export interface ITodo {
  id: string;
  title: string;
  description?: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  ownerId: string;
  collaborators: [unknown];
}