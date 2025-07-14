import React, {FC} from 'react';
import GenericFormDialog from "@/components/features/GenericFormDialog";
import {useStore} from "@/store";
import {IFormData} from "@/models/IFormData";
import {createTask} from "@/lib/firebase/firestore/createTask";

type Props = {
  children: React.ReactNode;
}

const AddTask:FC<Props> = ({children}) => {

  const {user,  selectedTodoList, addTask} = useStore();

  const handlerSubmit = async (data:IFormData) => {
    if (!user || !selectedTodoList) return;

    await createTask(selectedTodoList.id, data.title, data.description)
      .then(addTask)
  }

  return (
    <GenericFormDialog
      title='Додайте завдання до списку'
      description='Заповніть форму, щоб створити нове завдання.'
      hasDescription={true}
      handlerSubmit={handlerSubmit}
    >
      {children}
    </GenericFormDialog>
  );
};

export default AddTask;