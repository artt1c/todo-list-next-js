import {IUser} from "@/models/IUser";

export interface AuthUserSlice {
  user: IUser | null;
  setUser: (user: IUser) => void;
  logout: () => void;
  isAuth: () => boolean;
}

export const createUserSlice = (set: any, get:any):AuthUserSlice => ({
  user: null,
  setUser: (user:IUser | null) => set({user}),
  logout: () => set({user: null}),  
  isAuth: () => !!get().user,
})