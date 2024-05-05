import { useEffect, useState } from "react";
import { Header } from "./components/Header"
import { Tasks } from "./components/Tasks"
import { api } from "./lib/api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  // Estado em que está armazenado os steps/task
  const [tasks, setTasks] = useState([]);
  
  function notify() {
    toast.success("Step cadastrado com sucesso!")
  }

  // Faz a chamada na api/banco de dados para buscar os dados e salva no estado
  async function getTask() {
     const result = await api.get("/tasks")
     const tasksLoad = result.data

     if(tasksLoad) {
      setTasks(tasksLoad)  
    }
  }

  function setTasksAndSave(newTask) {
    setTasks(newTask);
  }

  // Adiciona os steps fornecido pelo usúario no banco de dados
 async function AddTask(taskTitle) {
  try {
    const data = {
      title: taskTitle,
      isCompleted: false
    }
    await api.post("/tasks", data).then((response) => {
      const tasks = response.data
      console.log(tasks)
    })

    if(tasks) {
      setTasksAndSave(tasks)
    }

  } catch (error) {
    console.log("erro!")
  }
  finally {
    if(tasks) {
      // Salva o step criado no estado e executa a função de carrega os steps cadastrados no banco
      setTasksAndSave(tasks)
      toast.success("Step cadastrado com sucesso!")
      getTask()
    }
    console.log("step cadastrado com sucesso!")
  }
 }

 // Deleta o step através do ID do step selecionado
 async function deleteTasksById(taskId) {
  try {
    const item = await api.delete(`/tasks/${taskId}`)
    if(!item) {
      return res.status(404).json({ error: 'Item não encontrado.' });
    }
    
  } catch (error) {
  console.log("erro!")
  } finally {
    toast.success("Step removido com sucesso!")
    getTask()
  }
 }

  // Verifica e adiciona como concluído o step selecionado
 function toggleTaskCompletedById(taskId) {
  const newTasks = tasks.map((task) => {
    if(task.id === taskId) {
      toast.success("Step concluído com sucesso!")
      return {
        ...task,
        isCompleted: !task.isCompleted,
      };
    }
     return task
  });
  setTasksAndSave(newTasks)
 }

 // Busca os steps no banco e renderiza na aplicação 
 useEffect(() => {
  getTask()
}, []);

  return (
    <>
      <ToastContainer />
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
