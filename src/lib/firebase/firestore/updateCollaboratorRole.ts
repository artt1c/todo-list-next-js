import {doc, getDoc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";
import {ITodo} from "@/models/ITodo";
import {ICollaborator} from "@/models/iCollaboartor";
import {toast} from "sonner";

type CollaboratorRole = 'admin' | 'viewer';

export const updateCollaboratorRole = async (
  todoId: string,
  collaboratorId: string,
  email: string,
  role: CollaboratorRole
) => {

  if (!todoId || !collaboratorId || !role) throw new Error('Todo ID, Collaborator ID, and Role are required.')

  const todoRef = doc(db, 'todoLists', todoId);

  try {
    const todoSnapshot = await getDoc(todoRef);
    if (!todoSnapshot.exists()) throw new Error(`TodoList with ID ${todoId} not found.`);

    const currentTodo = todoSnapshot.data() as ITodo;
    const currentCollaborators = currentTodo.collaborators || [];
    const currentCollaboratorIds = currentTodo.collaboratorIds || [];

    let newCollaborators: ICollaborator[];
    const newCollaboratorIds: string[] = [...currentCollaboratorIds];

    const existingCollaboratorIndex = currentCollaborators.findIndex(c => c.uid === collaboratorId);

    if (existingCollaboratorIndex !== -1) {

      newCollaborators = [...currentCollaborators];
      newCollaborators[existingCollaboratorIndex] = { uid: collaboratorId, role, email };

    } else {

      newCollaborators = [...currentCollaborators, { uid: collaboratorId, role, email }];
      newCollaboratorIds.push(collaboratorId);
    }


    await updateDoc(todoRef, {
      collaborators: newCollaborators,
      collaboratorIds: newCollaboratorIds,
      updatedAt: serverTimestamp(),
    });

  } catch (e) {
    toast.error('Не вдалося надати користувачу доступ')
    console.error(e)
  }
}