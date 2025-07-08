import {addDoc, collection, doc, getDoc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";
import {ITask} from "@/models/ITask";

export const createTask = async (todoListId: string, title:string, description:string = '') => {
  const tasksCollectionRef = collection(db, 'todoLists', todoListId, 'tasks')

  // Створення таски
  const docRef = await addDoc(tasksCollectionRef, {
    title,
    description,
    completed: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  // Додавання в середину ID
  await updateDoc(doc(db, 'todoLists', todoListId, 'tasks', docRef.id), {
    id: docRef.id,
  });

  const createdDoc = await getDoc(docRef);

  if (!createdDoc.exists()) {
    throw new Error(`Failed to retrieve newly created todoList with ID: ${docRef.id}`);
  }

  return {
    id: createdDoc.id,
    ...createdDoc.data() as Omit<ITask, 'id'>
  };
}