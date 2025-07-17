import {addDoc, collection, doc, getDoc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";
import {ITodo} from "@/models/ITodo";

export const createTodoList = async (title: string, uid:string) => {

  // Створення списку
  const docRef = await addDoc(collection(db, 'todoLists'), {
    title,
    ownerId: uid,
    collaborators: [],
    collaboratorIds: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  await updateDoc(doc(db, 'todoLists', docRef.id), {
    id: docRef.id,
  })

  const createdDoc = await getDoc(docRef);

  if (!createdDoc.exists()) {
    throw new Error(`Failed to retrieve newly created todoList with ID: ${docRef.id}`);
  }

  return {
    id: createdDoc.id,
    ...createdDoc.data() as Omit<ITodo, 'id'>
  };
}