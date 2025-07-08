import {deleteDoc, doc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";

export const deleteTask = async (todoListId: string, taskId: string): Promise<void> => {
  if (!todoListId || !taskId) {
    console.error("Помилка: Не вказано ID списку справ або ID завдання для видалення.");
    throw new Error("TodoList ID and Task ID are required for deletion.");
  }

  try {
    const taskDocRef = doc(db, 'todoLists', todoListId, 'tasks', taskId);
    await deleteDoc(taskDocRef);

    console.log(`Завдання '${taskId}' зі списку '${todoListId}' успішно видалено.`);
  } catch (error) {
    console.error(`Помилка видалення завдання '${taskId}' зі списку '${todoListId}':`, error);
    throw error;
  }
};