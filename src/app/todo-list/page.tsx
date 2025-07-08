'use client'

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {createTodoList} from "@/lib/firebase/firestore/createTodoList";
import {useStore} from "@/store";
import {createTasks} from "@/lib/firebase/firestore/createTasks";
import {ITodo} from "@/models/ITodo";

const TodoList = () => {

  const user = useStore(state => state.user);
  const addTodoList = useStore(state => state.addTodoList);
  const [todo, setTodo] = useState<ITodo| null>(null)



  const addTodo = async () => {
    if (!user) return;
    try {
      await createTodoList('testList', user.uid).then(value => {
        addTodoList(value);
        setTodo(value)
      })
    } catch (error) {
      console.error(error);
    }
  }

  const addTaskOnList = async () => {
    if (!user || !todo) return;
    try {
      await createTasks(todo.id, 'testTask', 'lorem ipsum');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      This is test page <br/>
      <Button onClick={addTodo}>Click me</Button>
      <Button onClick={addTaskOnList}>Click me</Button>
    </>
  );
};

export default TodoList;