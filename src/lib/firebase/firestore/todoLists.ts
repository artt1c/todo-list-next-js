import {addDoc, collection, doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";

const role: 'admin' | 'viewer' = 'admin';

export const createTodoList = async (title: string, uid:string) => {

  // Створення списку
  const docRef = await addDoc(collection(db, 'todoLists'), {
    title,
    ownerId: uid,
    collaborators: {
      [uid]: role
    },
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  // Додавання в середину ID
  await updateDoc(doc(db, 'todoLists', docRef.id), {
    id: docRef.id,
  })

  return docRef.id;
}