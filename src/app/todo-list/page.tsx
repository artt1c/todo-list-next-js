'use client'

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {createTodoList} from "@/lib/firebase/firestore/todoLists";
import {useStore} from "@/store";
import {createTasks} from "@/lib/firebase/firestore/tasks";

const TodoList = () => {

  const user = useStore(state => state.user);
  const [todoListId, setTodoListId] = useState<string | null>(null)


  const addTodo = async () => {
    if (!user) return;
    try {
      await createTodoList('testList', user.uid).then(setTodoListId)
    } catch (error) {
      console.error(error);
    }
  }

  const addTaskOnList = async () => {
    if (!user || !todoListId) return;
    try {
      await createTasks(todoListId, 'testTask', 'lorem ipsum');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      This is test page <br/>
      <Button onClick={addTodo}>Click me</Button>
      <p>{todoListId}</p>
      <Button onClick={addTaskOnList}>Click me</Button>
    </>
  );
};

export default TodoList;