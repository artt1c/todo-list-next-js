'use client'

import React, {useEffect} from 'react';
import {getCollabTodoListByUid} from "@/lib/firebase/firestore/getCollabTodoListByUid";
import {useStore} from "@/store";
import ResizableLayout from "@/components/layout/ResizableLayout";
import {getTasksByTodoId} from "@/lib/firebase/firestore/getTasksByTodoId";

const SharedList = () => {

  const user = useStore(state => state.user);
  const sharedTodoLists = useStore(state => state.sharedTodoLists);
  const sharedTasks = useStore(state => state.sharedTasks);
  const selectedSharedTodoList = useStore(state => state.selectedSharedTodoList);

  const setSelectedSharedTodoList = useStore(state => state.setSelectedSharedTodoList);
  const setSharedTodoLists = useStore(state => state.setSharedTodoLists);
  const addSharedTodoList = useStore(state => state.addSharedTodoList);
  const deleteSharedTodoList = useStore(state => state.deleteSharedTodoList);
  const updateSharedTodoList = useStore(state => state.updateSharedTodoList);

  const setSharedTasks = useStore(state => state.setSharedTasks);
  const addSharedTask = useStore(state => state.addSharedTask);
  const updateSharedTask = useStore(state => state.updateSharedTask);
  const resetSharedTasks = useStore(state => state.resetSharedTasks);
  const deleteSharedTask = useStore(state => state.deleteSharedTask);


  // Для todoList
  useEffect(() => {
    const fetchTodoLists = async () => {
      if (user) {
        const fetchedLists = await getCollabTodoListByUid(user.uid);
        if (fetchedLists) setSharedTodoLists(fetchedLists);
      } else {
        setSharedTodoLists([]);
        setSelectedSharedTodoList(null);
        resetSharedTasks();
      }
    };

    fetchTodoLists();
  }, [user, setSharedTodoLists, setSelectedSharedTodoList, resetSharedTasks]);


  // Для tasks
  useEffect(() => {
    const fetchTasksForSelectedList = async () => {
      if (selectedSharedTodoList) {
        try {
          const fetchedTasks = await getTasksByTodoId(selectedSharedTodoList.id);
          if (fetchedTasks) setSharedTasks(fetchedTasks);
        } catch (error) {
          console.error("Помилка завантаження завдань:", error);
          setSharedTasks([]);
        }
      } else {
        setSharedTasks([]);
      }
    };

    fetchTasksForSelectedList();
  }, [selectedSharedTodoList, setSharedTasks]);

  return (
    <div className='h-full'>
      <ResizableLayout
        disableAddBtn={true}
        todoLists={sharedTodoLists}
        tasks={sharedTasks}
        selectedTodoList={selectedSharedTodoList}
        setSelectedTodoList={setSelectedSharedTodoList}
        addTodoList={addSharedTodoList}
        addTask={addSharedTask}
        updateTaskZustand={updateSharedTask}
        deleteTaskZustand={deleteSharedTask}
        deleteTodoListZustand={deleteSharedTodoList}
        updateTodoList={updateSharedTodoList}
      />
    </div>
  );
};

export default SharedList;