'use client'

import React, {useEffect} from 'react';
import {getCollabTodoListByUid} from "@/lib/firebase/firestore/getCollabTodoListByUid";
import {useStore} from "@/store";

const SharedList = () => {


  const user = useStore(state => state.user);
  // const todoLists = useStore(state => state.todoLists);
  // const tasks = useStore(state => state.tasks);
  // const selectedTodoList = useStore(state => state.selectedTodoList);
  //
  const setSelectedTodoList = useStore(state => state.setSelectedTodoList);
  const setTodoLists = useStore(state => state.setTodoLists);
  // const deleteTodoListZustand = useStore(state => state.deleteTodoList);
  //
  const resetTasks = useStore(state => state.resetTasks);
  // const setTasks = useStore(state => state.setTasks);
  // const updateTaskZustand = useStore(state => state.updateTask);
  // const deleteTaskZustand = useStore(state => state.deleteTask);


  // Для todoList
  useEffect(() => {
    const fetchTodoLists = async () => {
      if (user) {
        const fetchedLists = await getCollabTodoListByUid(user.uid);
        console.log(fetchedLists);
        // if (fetchedLists) setTodoLists(fetchedLists);
      } else {
        // setTodoLists([]);
        // setSelectedTodoList(null);
        // resetTasks();
      }
    };

    fetchTodoLists();
  }, [user, setTodoLists, setSelectedTodoList, resetTasks]);


  // // Для tasks
  // useEffect(() => {
  //   const fetchTasksForSelectedList = async () => {
  //     if (selectedTodoList) {
  //       try {
  //         const fetchedTasks = await getTasksByTodoId(selectedTodoList.id);
  //         if (fetchedTasks) setTasks(fetchedTasks);
  //       } catch (error) {
  //         console.error("Помилка завантаження завдань:", error);
  //         setTasks([]);
  //       }
  //     } else {
  //       setTasks([]);
  //     }
  //   };
  //
  //   fetchTasksForSelectedList();
  // }, [selectedTodoList, setTasks]);

  return (
    <div>
      SharedList
    </div>
  );
};

export default SharedList;