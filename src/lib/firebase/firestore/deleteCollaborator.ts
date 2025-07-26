import {doc, getDoc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";
import {ITodo} from "@/models/ITodo";

export const deleteCollaborator = async (todoId:string, collaboratorsId:string) => {

  if (!todoId || !collaboratorsId) throw new Error('Todo ID and Collaborator ID are required for removal.')

  const todoRef = doc(db, 'todoLists', todoId);

  try {
    const todoSnapshot = await getDoc(todoRef);
    if (!todoSnapshot.exists()) throw new Error(`TodoList with ID ${todoId} not found.`);

    const currentTodo = todoSnapshot.data() as ITodo;
    const currentCollaborators = currentTodo.collaborators || [];
    const currentCollaboratorIds = currentTodo.collaboratorIds || [];

    const newCollaborators = currentCollaborators.filter(c => c.uid !== collaboratorsId)
    const newCollaboratorIds = currentCollaboratorIds.filter(cId => cId !== collaboratorsId)


    await updateDoc(todoRef, {
      collaborators: newCollaborators,
      collaboratorIds: newCollaboratorIds,
      updatedAt: serverTimestamp(),
    });

  } catch (e) {
    console.error(e);
    throw e;
  }
}