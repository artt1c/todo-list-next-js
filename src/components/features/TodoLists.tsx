import React, {FC} from 'react';
import {ITodo} from "@/models/ITodo";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formattedTimeInMs} from "@/lib/formattedTimeInMs";
import {Button} from "@/components/ui/button";
import {Trash} from "lucide-react";
import AddTodo from "@/components/features/AddTodo";
import {deleteTodoList} from "@/lib/firebase/firestore/deletTodoList";
import {useStore} from "@/store";
import ContextMenuWrapper from "@/components/layout/ContextMenuWrapper";

type Props = {
  list:ITodo[];
  setSelectedTodoList: (id: ITodo) => void;
  selectedTodoList: ITodo | null
}

const TodoLists:FC<Props> = ({list, setSelectedTodoList, selectedTodoList}) => {
  const { deleteTodoList: deleteTodoListZustand } = useStore();

  const handleDelete = async (todoId: string) => {
    try {
      await deleteTodoList(todoId);
      deleteTodoListZustand(todoId);
      if (todoId === selectedTodoList?.id) {
        setSelectedTodoList(list[0]);
      }
    } catch (error) {
      console.error("Помилка видалення списку:", error);
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
            <TableHead className='flex justify-center items-center'>
              <AddTodo />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((todo) => (
            <TableRow key={todo.id}
              onClick={() => {setSelectedTodoList(todo)}}
            >
                <TableCell>
                  <ContextMenuWrapper>
                    {todo.title}
                  </ContextMenuWrapper>
                </TableCell>
                <TableCell>{formattedTimeInMs(todo.createdAt.seconds * 1000)}</TableCell>
                <TableCell className='flex justify-center'>
                  <Button
                    variant='destructive'
                    className='size-6'
                    onClick={ async () => {
                      await handleDelete(todo.id)
                    }}
                  >
                    <Trash/>
                  </Button>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoLists;