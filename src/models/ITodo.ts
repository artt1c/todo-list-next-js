import {Timestamp} from "@firebase/firestore";
import {ICollaborator} from "@/models/iCollaboartor";

export interface ITodo {
  id: string;
  title: string;
  updatedAt: Timestamp;
  createdAt: Timestamp;
  ownerId: string;
  collaborators: ICollaborator[];
  collaboratorIds: string[];
}