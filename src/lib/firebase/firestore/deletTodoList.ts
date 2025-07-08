import {collection, doc, getDocs, query, writeBatch} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";

export const deleteTodoList = async (todoListId:string) => {
  if (!todoListId) {
    console.error("Помилка: Не вказано ID списку справ для видалення.");
    throw new Error("TodoList ID is required for deletion.");
  }

  try {
    const tasksCollectionRef = collection(db, 'todoLists', todoListId, 'tasks');
    const q = query(tasksCollectionRef);

    const tasksSnapshot = await getDocs(q);

    const batch = writeBatch(db);

    tasksSnapshot.forEach((taskDoc) => {
      batch.delete(taskDoc.ref);
    });

    const todoListDocRef = doc(db, 'todoLists', todoListId);
    batch.delete(todoListDocRef);

    await batch.commit();

  } catch (error) {
    console.error(`Помилка видалення списку справ '${todoListId}':`, error);
    throw error;
  }
}