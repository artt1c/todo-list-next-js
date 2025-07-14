import {ITodo} from "@/models/ITodo";
import {ITask} from "@/models/ITask";
import {StateCreator} from "zustand/vanilla";

export interface TodoListSlice {
  todoLists: ITodo[];
  selectedTodoList: ITodo | null;
  tasks: ITask[];

  setTodoLists: (lists: ITodo[]) => void;
  addTodoList: (list: ITodo) => void;
  updateTodoList: (listId: string, updatedFields: Partial<ITodo>) => void;
  deleteTodoList: (listId: string) => void;

  setSelectedTodoList: (list: ITodo | null) => void;
  setTasks: (tasks: ITask[]) => void;
  addTask: (task: ITask) => void;
  updateTask: (taskId: string, updatedFields: Partial<ITask>) => void;
  deleteTask: (taskId: string) => void;
  resetTasks: () => void;
}


// В ідеалі потрібно рознести по різним слайсам todoLsit і task
export const createTodoListSlice: StateCreator<TodoListSlice> = (set) => ({
  todoLists: [],
  selectedTodoList: null,
  tasks: [],

  setTodoLists: (lists) => set({ todoLists: lists }),
  addTodoList: (list) => set(state => ({ todoLists: [...state.todoLists, list] })),
  updateTodoList: (listId, updatedFields) =>
    set(state => ({
      todoLists: state.todoLists.map(list =>
        list.id === listId ? { ...list, ...updatedFields } : list
      ),
      selectedTodoList: state.selectedTodoList?.id === listId
        ? { ...state.selectedTodoList, ...updatedFields }
        : state.selectedTodoList,
    })),
  deleteTodoList: (listId) =>
    set(state => ({
      todoLists: state.todoLists.filter(list => list.id !== listId),
      selectedTodoList: state.selectedTodoList?.id === listId ? null : state.selectedTodoList,
      tasks: state.selectedTodoList?.id === listId ? [] : state.tasks,
    })),

  setSelectedTodoList: (list) => set({ selectedTodoList: list, tasks: [] }),

  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set(state => ({ tasks: [...state.tasks, task] })),
  updateTask: (taskId, updatedFields) =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === taskId ? { ...task, ...updatedFields } : task
      )
    })),
  deleteTask: (taskId) =>
    set(state => ({
      tasks: state.tasks.filter(task => task.id !== taskId)
    })),
  resetTasks: () => set({ tasks: [] }),
});