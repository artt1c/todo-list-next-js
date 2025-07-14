import React, {FC} from 'react';
import {ITask} from "@/models/ITask";
import {RefreshCcw} from "lucide-react";
import GenericFormDialog from "@/components/features/GenericFormDialog";
import {useStore} from "@/store";
import {IFormData} from "@/models/IFormData";
import {updateTaskFire} from "@/lib/firebase/firestore/updateTaskFire";


type Props = {
  task: ITask;
};

const UpdateTask:FC<Props> = ({task}) => {

  const {user, selectedTodoList, updateTask: updateTask} = useStore();

  const handlerSubmit = async (data:IFormData) => {
    if (!user || !selectedTodoList || !data.description) return;

    task.title = data.title;
    task.description = data.description
    await updateTaskFire(selectedTodoList.id, task.id, task)

    updateTask(task.id, task)
    console.log(task)
  }

  return (
    <GenericFormDialog
      title='Додайте завдання до списку'
      description='Заповніть форму, щоб створити нове завдання.'
      hasDescription={true}
      handlerSubmit={handlerSubmit}
      initialValues={{
        title: task.title ?? '',
        description: task.description ?? '',
      }}
    >
      <RefreshCcw className='size-6 p-1'/>
    </GenericFormDialog>
  );
};

export default UpdateTask;