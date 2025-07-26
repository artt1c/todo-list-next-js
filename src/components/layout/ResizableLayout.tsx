import React, {FC} from 'react';
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import TodoLists from "@/components/features/TodoLists";
import TaskList from "@/components/features/TaskList";
import {ITodo} from "@/models/ITodo";
import {ITask} from "@/models/ITask";

type Props = {
  disableAddBtn?: boolean;

  todoLists: ITodo[]
  tasks: ITask[]
  selectedTodoList: ITodo | null

  addTodoList: (list: ITodo) => void;
  setSelectedTodoList: (list: ITodo | null) => void
  deleteTodoListZustand: (listId: string) => void;
  updateTodoList: (listId: string, updatedFields: Partial<ITodo>) => void;

  addTask: (task: ITask) => void;
  updateTaskZustand: (taskId: string, updatedFields: Partial<ITask>) => void;
  deleteTaskZustand: (taskId: string) => void;
}

const ResizableLayout:FC<Props> = ({
                                     todoLists,
                                     tasks,
                                     selectedTodoList,
                                     setSelectedTodoList,
                                     updateTaskZustand,
                                     deleteTaskZustand,
                                     deleteTodoListZustand,
                                     updateTodoList,
                                     addTodoList,
                                     addTask,
                                     disableAddBtn
}) => {

  return (
    <div className='h-full'>
      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel>
          <h3 className='p-2 font-bold'>Списки</h3>
          {todoLists && <TodoLists
            disableOwnerBtn={disableAddBtn}
            list={todoLists}
            selectedTodoList={selectedTodoList}
            setSelectedTodoList={setSelectedTodoList}
            addTodoList={addTodoList}
            updateTodoList={updateTodoList}
            deleteTodoListZustand={deleteTodoListZustand}
          />}
        </ResizablePanel>
        <ResizableHandle
          className='border-2'
        />
        <ResizablePanel>
          <div className='flex gap-2 items-center'>
            <h3 className='p-2 font-bold'>Завдання</h3>
            {selectedTodoList && <p>{selectedTodoList.title}</p>}
          </div>
          {tasks && <TaskList
            tasks={tasks}
            addTask={addTask}
            selectedTodoList={selectedTodoList}
            deleteTaskZustand={deleteTaskZustand}
            updateTaskZustand={updateTaskZustand}
          />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default ResizableLayout;