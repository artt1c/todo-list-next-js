import {addDoc, collection, doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";

export const createTasks = async (todoListId: string, title:string, description:string = '') => {
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

  return docRef.id;
}