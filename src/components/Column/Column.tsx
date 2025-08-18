import "./Column.css"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Task } from "../Task/Task";
import type { User } from "../../types/task";
interface ColumnProps {
    tasks: User [];
}

export const Column:React.FC <ColumnProps> = ( { tasks } ) => {
    return (
        <div className="column">
          <SortableContext items={tasks} strategy=
          {verticalListSortingStrategy}>
            {tasks.map((task ) =>(
                <Task id={task.id} title={task.title} key={task.id} />
            ))}
          </SortableContext>
        </div>
    );
  
    
};