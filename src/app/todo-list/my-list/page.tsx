'use client'

import React, {useEffect} from 'react';
import ResizableLayout from "@/components/layout/ResizableLayout";
import {useStore} from "@/store";
import {getTodoListsByUserId} from "@/lib/firebase/firestore/getTodoListsByUserId";
import {getTasksByTodoId} from "@/lib/firebase/firestore/getTasksByTodoId";

const MyLists = () => {

  const user = useStore(state => state.user);
  const todoLists = useStore(state => state.userTodoLists);
  const tasks = useStore(state => state.userTasks);
  const selectedTodoList = useStore(state => state.selectedUserTodoList);

  const setSelectedTodoList = useStore(state => state.setSelectedUserTodoList);
  const setTodoLists = useStore(state => state.setUserTodoLists);
  const addTodoList = useStore(state => state.addUserTodoList);
  const deleteTodoListZustand = useStore(state => state.deleteUserTodoList);
  const updateTodoListZustand = useStore(state => state.updateUserTodoList);


  const setTasks = useStore(state => state.setUserTasks);
  const addTask = useStore(state => state.addUserTask);
  const updateTaskZustand = useStore(state => state.updateUserTask);
  const resetTasks = useStore(state => state.resetUserTasks);
  const deleteTaskZustand = useStore(state => state.deleteUserTask);


  // Для todoList
  useEffect(() => {
    const fetchTodoLists = async () => {
      if (user) {
        const fetchedLists = await getTodoListsByUserId(user.uid);
        if (fetchedLists) setTodoLists(fetchedLists);
      } else {
        setTodoLists([]);
        setSelectedTodoList(null);
        resetTasks();
      }
    };

    fetchTodoLists();
  }, [user, setTodoLists, setSelectedTodoList, resetTasks]);


  // Для tasks
  useEffect(() => {
    const fetchTasksForSelectedList = async () => {
      if (selectedTodoList) {
        try {
          const fetchedTasks = await getTasksByTodoId(selectedTodoList.id);
          if (fetchedTasks) setTasks(fetchedTasks);
        } catch (error) {
          console.error("Помилка завантаження завдань:", error);
          setTasks([]);
        }
      } else {
        setTasks([]);
      }
    };

    fetchTasksForSelectedList();
  }, [selectedTodoList, setTasks]);


  return (
    <div className='h-full'>
      <ResizableLayout
        todoLists={todoLists}
        tasks={tasks}
        selectedTodoList={selectedTodoList}
        setSelectedTodoList={setSelectedTodoList}
        addTodoList={addTodoList}
        addTask={addTask}
        updateTaskZustand={updateTaskZustand}
        deleteTaskZustand={deleteTaskZustand}
        deleteTodoListZustand={deleteTodoListZustand}
        updateTodoList={updateTodoListZustand}
      />
    </div>
  );
};

export default MyLists;