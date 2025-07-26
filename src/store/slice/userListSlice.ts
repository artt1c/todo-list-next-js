import {ITodo} from "@/models/ITodo";
import {ITask} from "@/models/ITask";
import {StateCreator} from "zustand/vanilla";
import {ICollaborator} from "@/models/iCollaboartor";
import {Timestamp} from "@firebase/firestore";

export interface UserListSlice {
  userTodoLists: ITodo[];
  selectedUserTodoList: ITodo | null;
  userTasks: ITask[];

  setUserTodoLists: (lists: ITodo[]) => void;
  addUserTodoList: (list: ITodo) => void;
  updateUserTodoList: (listId: string, updatedFields: Partial<ITodo>) => void;
  deleteUserTodoList: (listId: string) => void;
  setSelectedUserTodoList: (list: ITodo | null) => void;

  addOrUpdateCollaborator: (todoId: string, collaborator: ICollaborator) => void;
  removeCollaborator: (todoId: string, collaboratorId: string) => void;

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


  addOrUpdateCollaborator: (todoId, collaborator) => {
    set(state => ({
      userTodoLists: state.userTodoLists.map(list => {
        if (list.id === todoId) {

          const filteredCollaborators = list.collaborators.filter(c => c.uid !== collaborator.uid);
          const updatedCollaborators = [...filteredCollaborators, collaborator];

          const updatedCollaboratorIds = [...list.collaboratorIds];
          if (!list.collaboratorIds.includes(collaborator.uid)) updatedCollaboratorIds.push(collaborator.uid);

          return {
            ...list,
            collaborators: updatedCollaborators,
            collaboratorIds: updatedCollaboratorIds,
            updatedAt: Timestamp.now(),
          }
        }
        return list;
      }),

      selectedUserTodoList: state.selectedUserTodoList?.id === todoId
        ? (() => {
          const filteredCollaborators = state.selectedUserTodoList.collaborators.filter(c => c.uid !== collaborator.uid);
          const updatedCollaborators = [...filteredCollaborators, collaborator];
          const updatedCollaboratorIds = Array.from(new Set([...state.selectedUserTodoList.collaboratorIds, collaborator.uid]));
          return {
            ...state.selectedUserTodoList,
            collaborators: updatedCollaborators,
            collaboratorIds: updatedCollaboratorIds,
            updatedAt: Timestamp.now(),
          };
        })()
        : state.selectedUserTodoList,
    }))
  },
  removeCollaborator: (todoId, collaboratorId) => {
    set(state => ({
      userTodoLists: state.userTodoLists.map(list => {
        if (list.id === todoId) {
          const updatedCollaborators = list.collaborators.filter(c => c.uid !== collaboratorId);
          const updatedCollaboratorIds = list.collaboratorIds.filter(id => id !== collaboratorId);

          return {
            ...list,
            collaborators: updatedCollaborators,
            collaboratorIds: updatedCollaboratorIds,
            updatedAt: Timestamp.now(),
          }
        }
        return list
      }),
      //
      selectedUserTodoList: state.selectedUserTodoList?.id === todoId
        ? (() => {
          const updatedCollaborators = state.selectedUserTodoList.collaborators.filter(c => c.uid !== collaboratorId);
          const updatedCollaboratorIds = state.selectedUserTodoList.collaboratorIds.filter(id => id !== collaboratorId);
          return {
            ...state.selectedUserTodoList,
            collaborators: updatedCollaborators,
            collaboratorIds: updatedCollaboratorIds,
            updatedAt: Timestamp.now(),
          };
        })()
        : state.selectedUserTodoList,
    }))
  },

  setUserTasks: (tasks) => set({ userTasks: tasks }),
  addUserTask: (task) => set(state => ({ userTasks: [...state.userTasks, task] })),

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