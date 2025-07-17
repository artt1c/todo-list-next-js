import React, {FC} from 'react';
import GenericFormDialog from "@/components/features/GenericFormDialog";
import {IFormData} from "@/models/IFormData";
import {createTask} from "@/lib/firebase/firestore/createTask";
import {useStore} from "@/store";
import {ITodo} from "@/models/ITodo";
import {ITask} from "@/models/ITask";

type Props = {
  children: React.ReactNode;
  selectedTodoList: ITodo | null;
  addTask: (task: ITask) => void;
}

const AddTask:FC<Props> = ({children, selectedTodoList, addTask}) => {

  const user = useStore(state => state.user);

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