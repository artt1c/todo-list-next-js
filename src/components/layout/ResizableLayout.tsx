'use client'

import React, {useEffect} from 'react';
import {useStore} from "@/store";
import {getTodoListsByUserId} from "@/lib/firebase/firestore/getTodoListsByUserId";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import TodoLists from "@/components/features/TodoLists";
import TaskList from "@/components/features/TaskList";

const ResizableLayout = () => {

  const user = useStore(state => state.user);
  const todoLists = useStore(state => state.todoLists);
  const setTodoLists = useStore(state => state.setTodoLists);
  const setSelectedTodoList = useStore(state => state.setSelectedTodoList);
  const selectedTodoList = useStore(state => state.selectedTodoList);
  const tasks = useStore(state => state.tasks);
  const resetTasks = useStore(state => state.resetTasks);

  useEffect(() => {
    const fetchTodoLists = async () => {
      if (user) {
        const lists = await getTodoListsByUserId(user.uid);
        setTodoLists(lists);
      } else {
        setTodoLists([]);
        setSelectedTodoList(null);
        resetTasks();
      }
    };

    fetchTodoLists();
  }, [user, setTodoLists, setSelectedTodoList, resetTasks]);

  return (
    <div className='h-full'>
      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={50}>
          {todoLists && <TodoLists list={todoLists} setSelectedTodoList={setSelectedTodoList} selectedTodoList={selectedTodoList}/>}
        </ResizablePanel>
        <ResizableHandle
          className='border-2'
        />
        <ResizablePanel defaultSize={50}>
          {tasks && <TaskList tasks={tasks}/>}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizableLayout;