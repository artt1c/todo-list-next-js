import {createTodoList} from "@/lib/firebase/firestore/createTodoList";
import {useStore} from "@/store";

export const createTodoListHelper = async (title:string, uid:string):Promise<void> => {
  const {addUserTodoList} = useStore.getState()

  try {
    await createTodoList(title, uid).then(addUserTodoList)
  } catch (error) {
    console.error(error);
  }
}