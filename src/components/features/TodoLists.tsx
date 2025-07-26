import React, {FC} from 'react';
import {ITodo} from "@/models/ITodo";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {formattedTimeInMs} from "@/lib/formattedTimeInMs";
import {Button} from "@/components/ui/button";
import {CirclePlus, Trash} from "lucide-react";
import {deleteTodoList} from "@/lib/firebase/firestore/deletTodoList";
import AddTodo from "@/components/features/AddTodo";
import UpdateTodo from "@/components/features/UpdateTodo";
import Collaborators from "@/components/features/Collaborators";

type Props = {
  disableOwnerBtn?: boolean
  list:ITodo[];
  setSelectedTodoList: (id: ITodo) => void;
  selectedTodoList: ITodo | null
  addTodoList: (list: ITodo) => void;
  updateTodoList: (listId: string, updatedFields: Partial<ITodo>) => void;
  deleteTodoListZustand: (listId: string) => void;
}

const TodoLists:FC<Props> = ({
                               list,
                               setSelectedTodoList,
                               selectedTodoList,
                               deleteTodoListZustand,
                               updateTodoList,
                               addTodoList,
                               disableOwnerBtn
}) => {

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
              {
                !disableOwnerBtn && <AddTodo addTodoList={addTodoList}>
                  <span className='flex gap-2 items-center px-2 py-1'>
                    Створити
                    <CirclePlus/>
                  </span>
                </AddTodo>
              }

            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((todo) => (
            <TableRow key={todo.id}
              onClick={() => {setSelectedTodoList(todo)}}
            >
                <TableCell>
                  {todo.title}
                </TableCell>
                <TableCell>{formattedTimeInMs(todo.createdAt.seconds * 1000)}</TableCell>
                <TableCell className='flex justify-center gap-2'>
                  <Button
                    variant='destructive'
                    className='size-6'
                    onClick={ async () => {
                      await handleDelete(todo.id)
                    }}
                  >
                    <Trash/>
                  </Button>

                  <UpdateTodo todo={todo} updateTodoList={updateTodoList}/>

                  {!disableOwnerBtn && <Collaborators todoList={todo}/>}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TodoLists;