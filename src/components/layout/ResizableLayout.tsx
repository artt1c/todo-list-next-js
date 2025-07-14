'use client'

import React, {useEffect} from 'react';
import {useStore} from "@/store";
import {getTodoListsByUserId} from "@/lib/firebase/firestore/getTodoListsByUserId";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import TodoLists from "@/components/features/TodoLists";
import TaskList from "@/components/features/TaskList";
import {getTasksByTodoId} from "@/lib/firebase/firestore/getTasksByTodoId";

const ResizableLayout = () => {

  const user = useStore(state => state.user);
  const todoLists = useStore(state => state.todoLists);
  const setTodoLists = useStore(state => state.setTodoLists);
  const setSelectedTodoList = useStore(state => state.setSelectedTodoList);
  const selectedTodoList = useStore(state => state.selectedTodoList);
  const tasks = useStore(state => state.tasks);
  const resetTasks = useStore(state => state.resetTasks);
  const setTasks = useStore(state => state.setTasks);

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
      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50}>
          <h3 className='p-2 font-bold'>Списки</h3>
          {todoLists && <TodoLists list={todoLists} setSelectedTodoList={setSelectedTodoList} selectedTodoList={selectedTodoList}/>}
        </ResizablePanel>
        <ResizableHandle
          className='border-2'
        />
        <ResizablePanel defaultSize={50}>
          <div className='flex gap-2 items-center'>
            <h3 className='p-2 font-bold'>Завдання</h3>
            {selectedTodoList && <p>{selectedTodoList.title}</p>}
          </div>
          {tasks && <TaskList tasks={tasks} selectedTodoList={selectedTodoList}/>}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizableLayout;