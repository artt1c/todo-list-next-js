import {ITodo} from "@/models/ITodo";
import {ITask} from "@/models/ITask";
import {StateCreator} from "zustand/vanilla";

export interface UserListSlice {
  userTodoLists: ITodo[];
  selectedUserTodoList: ITodo | null;
  userTasks: ITask[];

  setUserTodoLists: (lists: ITodo[]) => void;
  addUserTodoList: (list: ITodo) => void;
  updateUserTodoList: (listId: string, updatedFields: Partial<ITodo>) => void;
  deleteUserTodoList: (listId: string) => void;

  setSelectedUserTodoList: (list: ITodo | null) => void;
  setUserTasks: (tasks: ITask[]) => void;
  addUserTask: (task: ITask) => void;
  updateUserTask: (taskId: string, updatedFields: Partial<ITask>) => void;
  deleteUserTask: (taskId: string) => void;
  resetUserTasks: () => void;
}


export const createUserListSlice: StateCreator<UserListSlice> = (set) => ({
  userTodoLists: [],
  selectedUserTodoList: null,
  userTasks: [],

  setUserTodoLists: (lists) => set({ userTodoLists: lists }),
  addUserTodoList: (list) => set(state => ({ userTodoLists: [...state.userTodoLists, list] })),
  updateUserTodoList: (listId, updatedFields) =>
    set(state => ({
      userTodoLists: state.userTodoLists.map(list =>
        list.id === listId ? { ...list, ...updatedFields } : list
      ),
      selectedUserTodoList: state.selectedUserTodoList?.id === listId
        ? { ...state.selectedUserTodoList, ...updatedFields }
        : state.selectedUserTodoList,
    })),
  deleteUserTodoList: (listId) =>
    set(state => ({
      userTodoLists: state.userTodoLists.filter(list => list.id !== listId),
      selectedUserTodoList: state.selectedUserTodoList?.id === listId ? null : state.selectedUserTodoList,
      userTasks: state.selectedUserTodoList?.id === listId ? [] : state.userTasks,
    })),
  setSelectedUserTodoList: (list) => set({ selectedUserTodoList: list, userTasks: [] }),

  setUserTasks: (tasks) => set({ userTasks: tasks }),
  addUserTask: (task) => set(state => ({ userTasks: [...state.userTasks, task] })),

  // refactor not update title
  updateUserTask: (taskId, updatedFields) =>
    set(state => ({
      userTasks: state.userTasks.map(task =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    })),
  deleteUserTask: (taskId) =>
    set(state => ({
      userTasks: state.userTasks.filter(task => task.id !== taskId)
    })),
  resetUserTasks: () => set({ userTasks: [] }),
});