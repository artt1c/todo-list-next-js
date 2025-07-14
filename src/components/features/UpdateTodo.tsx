import React, {FC} from 'react';
import GenericFormDialog from "@/components/features/GenericFormDialog";
import {useStore} from "@/store";
import {IFormData} from "@/models/IFormData";
import {updateTodo} from "@/lib/firebase/firestore/updateTodo";
import {RefreshCcw} from "lucide-react";
import {ITodo} from "@/models/ITodo";

type Props = {
  todo: ITodo
}

const UpdateTodo:FC<Props> = ({todo}) => {

  // Store
  const {user, updateTodoList} = useStore();

  const handlerSubmit = async (data:IFormData) => {
    if (!user) return;

    todo.title = data.title;
    await updateTodo(todo.id, todo)

    updateTodoList(todo.id, todo)
  }

  return (
    <GenericFormDialog
      title='Додайте завдання до списку'
      description='Заповніть форму, щоб створити нове завдання.'
      hasDescription={false}
      handlerSubmit={handlerSubmit}
      initialValues={{title: todo.title}}
    >
      <RefreshCcw className='size-6 p-1'/>
    </GenericFormDialog>
  );
};

export default UpdateTodo;