import {AuthUserSlice, createUserSlice} from "@/store/slice/authUserSlice";
import {create} from "zustand/react";
import {createJSONStorage, persist} from "zustand/middleware";

type AppState = AuthUserSlice;

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...createUserSlice(set, get),
    }),
    {
      name: 'AppState',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
)