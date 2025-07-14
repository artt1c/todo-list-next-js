import {IUser} from "@/models/IUser";
import {StateCreator} from "zustand/vanilla";

export interface AuthUserSlice {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
  isAuth: () => boolean;
}

export const createUserSlice:StateCreator<AuthUserSlice> = (set, get):AuthUserSlice => ({
  user: null,
  setUser: (user:IUser | null) => set({user}),
  logout: () => set({user: null}),  
  isAuth: () => !!get().user,
})