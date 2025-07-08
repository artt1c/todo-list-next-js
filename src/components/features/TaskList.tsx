import React, {FC} from 'react';
import {ITask} from "@/models/ITask";

type Props = {
  tasks: ITask[];
}

const TaskList:FC<Props> = ({tasks}) => {

  console.log(tasks)

  return (
    <div>
      TaskList
    </div>
  );
};

export default TaskList;