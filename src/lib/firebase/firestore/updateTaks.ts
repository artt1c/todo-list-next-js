import {ITask} from "@/models/ITask";
import {doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";

export const updateTask = async (
  todoListId: string,
  taskId: string,
  updatedFields: Partial<Omit<ITask, 'id' | 'createdAt'>>
) => {
  if (!todoListId || !taskId) {
    console.error("Помилка: Не вказано ID списку справ або ID завдання для оновлення.");
    throw new Error("TodoList ID and Task ID are required for update.");
  }

  const taskDocRef = doc(db, 'todoLists', todoListId, 'tasks', taskId);

  try {
    await updateDoc(taskDocRef, {
      ...updatedFields,
      updatedAt: serverTimestamp(),
    });

    console.log(`Завдання '${taskId}' зі списку '${todoListId}' успішно оновлено.`);
  } catch (error) {
    console.error(`Помилка оновлення завдання '${taskId}' зі списку '${todoListId}':`, error);
  }
};