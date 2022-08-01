import { useEffect, useState } from "react";
import { Header } from "./components/Header"
import { Tasks } from "./components/Tasks"


const LOCALSTORAGE_KEY = "todoList: savedTasks"

function App() {
const [tasks, setTasks] = useState([]);

function loadSavedTasks() {
  const saved = localStorage.getItem(LOCALSTORAGE_KEY);
  if (saved) {
    setTasks(JSON.parse(saved));
  }
}

function setTasksAndSave(newTask) {
  setTasks(newTask);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newTask));
 
}

  useEffect(() => {
    loadSavedTasks();
  }, []);

 function AddTask(taskTitle) {
  setTasksAndSave([
    ...tasks,
    {
      id: crypto.randomUUID(),
      title: taskTitle,
      isCompleted: false
    }
  ])
 }

 function deleteTasksById(taskId) {
  const newTasks = tasks.filter(task => task.id != taskId);
  setTasksAndSave(newTasks);
 }

 function toggleTaskCompletedById(taskId) {
  const newTasks = tasks.map((task) => {
    if(task.id === taskId) {
      return {
        ...task,
        isCompleted: !task.isCompleted,
      };
    }
     return task
  });
  setTasksAndSave(newTasks)
 }

  return (
    <>
      <Header onAddTask={AddTask} /> 
      <Tasks 
        tasks={tasks} 
        onDelete={deleteTasksById} 
        onCompleted={toggleTaskCompletedById}  
      />
    </>
  );
}

export default App
