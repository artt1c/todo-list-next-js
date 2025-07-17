'use client'

import React, {FC} from 'react';
import GenericFormDialog from "@/components/features/GenericFormDialog";
import {useStore} from "@/store";
import {createTodoList} from "@/lib/firebase/firestore/createTodoList";
import {IFormData} from "@/models/IFormData";
import {ITodo} from "@/models/ITodo";

type Props = {
  children: React.ReactNode;
  addTodoList: (list: ITodo) => void;
}

const AddTodo:FC<Props> = ({children, addTodoList}) => {

  // Store
  const user = useStore(state => state.user);

  const handlerSubmit = async (data:IFormData) => {
    if (!user) return;

    await createTodoList(data.title, user.uid)
      .then(addTodoList);
  }

  return (
    <GenericFormDialog
      title='Додайте завдання до списку'
      description='Заповніть форму, щоб створити нове завдання.'
      hasDescription={false}
      handlerSubmit={handlerSubmit}
    >
      {children}
    </GenericFormDialog>
  );
};

export default AddTodo;