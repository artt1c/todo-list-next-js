import React, {FC} from 'react';
import {ITask} from "@/models/ITask";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formattedTimeInMs} from "@/lib/formattedTimeInMs";
import {Button} from "@/components/ui/button";
import {CirclePlus, MinusCircle, PlusCircle, Trash} from "lucide-react";
import {useStore} from "@/store";
import {ITodo} from "@/models/ITodo";
import {deleteTask} from "@/lib/firebase/firestore/deleteTask";
import AddTask from "@/components/features/AddTask";
import {updateTaskFire} from "@/lib/firebase/firestore/updateTaskFire";
import UpdateTask from "@/components/features/UpdateTask";

type Props = {
  tasks: ITask[];
  selectedTodoList: ITodo | null;
}

const TaskList:FC<Props> = ({tasks, selectedTodoList}) => {

  const deleteTaskZustand = useStore(state => state.deleteTask);
  const updateTaskZustand = useStore(state => state.updateTask);

  const handleDeleteTask = async (taskId: string) => {
    if (!selectedTodoList) {
      console.error("Не обрано список справ для видалення завдання.");
      return;
    }

    try {
      await deleteTask(selectedTodoList.id, taskId);
      deleteTaskZustand(taskId);

    } catch (error) {
      console.error("Помилка видалення завдання:", error);
    }
  };

  const handleToggleTaskComplete = async (task: ITask) => {
    if (!selectedTodoList) {
      console.error("Не обрано список справ для оновлення завдання.");
      return;
    }

    const newCompletedStatus = !task.completed;

    try {
      await updateTaskFire(selectedTodoList.id, task.id, { completed: newCompletedStatus });

      updateTaskZustand(task.id, { completed: newCompletedStatus });

      console.log(`Статус завдання '${task.title}' змінено на: ${newCompletedStatus ? 'Виконано' : 'Не виконано'}`);
    } catch (error) {
      console.error("Помилка при оновленні статусу завершення завдання:", error);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Назва
            </TableHead>
            <TableHead>
              Створено
            </TableHead>
            <TableHead>
              Опис
            </TableHead>
            <TableHead>
              Стан
            </TableHead>
            <TableHead className='flex justify-center items-center'>
              <AddTask>
               <span className='flex gap-2 items-center px-2 py-1'>
                  Створити!
                  <CirclePlus/>
                </span>
              </AddTask>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                {task.title}
              </TableCell>
              <TableCell>{formattedTimeInMs(task.createdAt.seconds * 1000)}</TableCell>
              <TableCell>
                  {task.description}
              </TableCell>
              <TableCell
                onClick={async () => {await handleToggleTaskComplete(task)}}
              >
                {task.completed ? <PlusCircle/> : <MinusCircle/>}
              </TableCell>
              <TableCell className='flex gap-2 justify-center'>
                <Button
                  variant='destructive'
                  className='size-6'
                  onClick={ async () => {
                    await handleDeleteTask(task.id);
                  }}
                >
                  <Trash/>
                </Button>
                <UpdateTask task={task}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskList;