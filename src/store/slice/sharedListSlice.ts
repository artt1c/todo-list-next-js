import {ITodo} from "@/models/ITodo";
import {ITask} from "@/models/ITask";
import {StateCreator} from "zustand/vanilla";

export interface SharedListSlice {
  sharedTodoLists: ITodo[];
  selectedSharedTodoList: ITodo | null;
  sharedTasks: ITask[];

  setSharedTodoLists: (lists: ITodo[]) => void;
  addSharedTodoList: (list: ITodo) => void;
  updateSharedTodoList: (listId: string, updatedFields: Partial<ITodo>) => void;
  deleteSharedTodoList: (listId: string) => void;

  setSelectedSharedTodoList: (list: ITodo | null) => void;
  setSharedTasks: (tasks: ITask[]) => void;
  addSharedTask: (task: ITask) => void;
  updateSharedTask: (taskId: string, updatedFields: Partial<ITask>) => void;
  deleteSharedTask: (taskId: string) => void;
  resetSharedTasks: () => void;
}

export const createSharedListSlice: StateCreator<SharedListSlice> = (set) => ({
  sharedTodoLists: [],
  selectedSharedTodoList: null,
  sharedTasks: [],
  
  setSharedTodoLists: (lists) => set({ sharedTodoLists: lists}),
  addSharedTodoList: (list) => set(state => ({ sharedTodoLists: [...state.sharedTodoLists, list]})),
  updateSharedTodoList: (listId, updatedFields) =>
    set(state => ({
      sharedTodoLists: state.sharedTodoLists.map(list =>
        list.id === listId ? { ...list, ...updatedFields } : list
      ),
      selectedSharedTodoList: state.selectedSharedTodoList?.id === listId
        ? { ...state.selectedSharedTodoList, ...updatedFields }
        : state.selectedSharedTodoList,
    })),
  deleteSharedTodoList: (listId) =>
    set(state => ({
      sharedTodoLists: state.sharedTodoLists.filter(list => list.id !== listId),
      selectedSharedTodoList: state.selectedSharedTodoList?.id === listId ? null : state.selectedSharedTodoList,
      sharedTasks: state.selectedSharedTodoList?.id === listId ? [] : state.sharedTasks,
    })),
  setSelectedSharedTodoList: (list) => set({ selectedSharedTodoList: list, sharedTasks: [] }),

  setSharedTasks: (tasks) => set({ sharedTasks: tasks }),
  addSharedTask: (task) => set(state => ({ sharedTasks: [...state.sharedTasks, task] })),

  updateSharedTask: (taskId, updatedFields) =>
    set(state => ({
      sharedTasks: state.sharedTasks.map(task =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    })),
  deleteSharedTask: (taskId) =>
    set(state => ({
      sharedTasks: state.sharedTasks.filter(task => task.id !== taskId)
    })),
  resetSharedTasks: () => set({ sharedTasks: [] }),
})