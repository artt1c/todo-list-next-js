import {AuthUserSlice, createUserSlice} from "@/store/slice/authUserSlice";
import {createUserListSlice, UserListSlice} from "@/store/slice/userListSlice";
import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";
import {createSharedListSlice, SharedListSlice} from "@/store/slice/sharedListSlice";

type AppState = AuthUserSlice & UserListSlice & SharedListSlice;

export const useStore = create<AppState>()(
  persist(
    (set, get, store) => ({
      ...createUserSlice(set, get, store),
      ...createUserListSlice(set, get, store),
      ...createSharedListSlice(set, get, store)
    }),
    {
      name: 'AppState',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)