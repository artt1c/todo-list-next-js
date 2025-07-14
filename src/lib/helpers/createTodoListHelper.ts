import {createTodoList} from "@/lib/firebase/firestore/createTodoList";
import {useStore} from "@/store";

export const createTodoListHelper = async (title:string, uid:string):Promise<void> => {
  const {addTodoList} = useStore.getState()

  try {
    await createTodoList(title, uid).then(addTodoList)
  } catch (error) {
    console.error(error);
  }
}