import {AuthUserSlice, createUserSlice} from "@/store/slice/authUserSlice";
import {createTodoListSlice, TodoListSlice} from "@/store/slice/todoListSlice";
import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

type AppState = AuthUserSlice & TodoListSlice;

export const useStore = create<AppState>()(
  persist(
    (set, get, store) => ({
      ...createUserSlice(set, get, store),
      ...createTodoListSlice(set, get, store)
    }),
    {
      name: 'AppState',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)