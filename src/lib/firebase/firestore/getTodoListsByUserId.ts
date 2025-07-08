import {collection, getDocs, query, where} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";
import {ITodo} from "@/models/ITodo";

export const getTodoListsByUserId = async (uid: string) => {
  const todoListRef = collection(db, 'todoLists');
  const q = query(todoListRef, where('ownerId', '==', uid))

  try {
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs
      .map(doc => (
        {id: doc.id, ...doc.data()}
      )
    ) as ITodo[];
  } catch (error) {
    console.error(error);
  }
}