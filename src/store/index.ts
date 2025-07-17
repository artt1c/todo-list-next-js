import {AuthUserSlice, createUserSlice} from "@/store/slice/authUserSlice";
import {createUserListSlice, UserListSlice} from "@/store/slice/userListSlice";
import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

type AppState = AuthUserSlice & UserListSlice;

export const useStore = create<AppState>()(
  persist(
    (set, get, store) => ({
      ...createUserSlice(set, get, store),
      ...createUserListSlice(set, get, store)
    }),
    {
      name: 'AppState',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)