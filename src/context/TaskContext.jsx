//taskContext.jsx

import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);
  const [editModeTaskId, setEditModeTaskId] = useState(null);

  function clearEditMode() {
    setEditModeTaskId(null);
  }

  useEffect(() => {
    setTasks(data);
  }, []);

  function createTask(newTask) {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        title: newTask.title,
        id: prevTasks.length + 1,
        description: newTask.description,
      },
    ]);
  }

  function deleteTask(taskId) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }

  function editTask(updatedTask) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? { ...task, ...updatedTask } : task
      )
    );
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        editModeTaskId,
        clearEditMode,
        setEditModeTaskId,
        deleteTask,
        createTask,
        editTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
