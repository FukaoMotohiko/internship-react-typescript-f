import "./App.css"
import { useState } from "react";
import { closestCorners, DndContext } from "@dnd-kit/core";
import { Column } from "./components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useSensor, useSensors } from "@dnd-kit/core";
import { PointerSensor, TouchSensor, KeyboardSensor } from "@dnd-kit/core";
import { Input } from "./components/Input/Input";

interface useStateProps {
  id: number;
  title: string;
}

export default function App() {
  const [tasks, setTasks] = useState<useStateProps[]>([
    { id: 1 , title: "魚" },
    { id: 2 , title: "肉" },
    { id: 3 , title: "野菜" },
  ]);



  const getTaskPos = (id: number)  : number => tasks.findIndex((task) => task.id === id);
  const handleDragEnd = (event:any) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id === over.id) return;
    setTasks(tasks => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(tasks, originalPos, newPos);
    })
  };

  const addTask = (title: string) => {
    setTasks((tasks) => [...tasks, { id: tasks.length + 1, title } ]);
  };
  const sensors =useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor,{
      coordinateGetter: sortableKeyboardCoordinates,
    })
    

  );
  return (
    <div className="App">
      <h1>Vite + React</h1>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Input onSubmit={addTask}/>
        <Column tasks={tasks} />
      </DndContext>
    </div>
  );
}

