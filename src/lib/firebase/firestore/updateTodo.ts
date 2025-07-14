import {ITodo} from "@/models/ITodo";
import {doc, serverTimestamp, updateDoc} from "@firebase/firestore";
import {db} from "@/lib/firebase/clientApp";

export const updateTodo = async (
  todoListId: string,
  updateField: Partial<Omit<ITodo, 'id' | 'createdAt' | 'ownerId'>>
) => {

  if (!todoListId) {
    console.error("Помилка: Не вказано ID списку справ");
    throw new Error("TodoList ID are required for update.");
  }
  const todoDocRef = doc(db, 'todoLists', todoListId);

  try {
    await updateDoc(todoDocRef, {
      ...updateField,
      updatedAt: serverTimestamp(),
    })

    console.log(`Список '${todoListId}' успішно оновлено.`);
  } catch (error) {
    console.error(`Помилка оновлення списку '${todoListId}':`, error);
  }
}