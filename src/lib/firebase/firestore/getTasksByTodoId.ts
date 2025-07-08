import {collection, getDocs, query} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";
import {ITask} from "@/models/ITask";

export const getTasksByTodoId = async (todoListId: string) => {
  if (!todoListId) {
    console.error("Помилка: Не вказано ID списку справ для отримання завдань.");
    return [];
  }

  const tasksCollectionRef = collection(db, 'todoLists', todoListId, 'tasks');

  const q = query(tasksCollectionRef);

  try {
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as ITask[];

  } catch (error) {
    console.error(`Помилка отримання завдань для списку '${todoListId}':`, error);
  }
}