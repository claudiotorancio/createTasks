import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";
import EditTaskModal from "./EditTaskModal";

function TaskEdit() {
  const { tasks, editModeTaskId, setEditModeTaskId, editTask } =
    useContext(TaskContext);

  const handleCloseModal = () => {
    setEditModeTaskId(null);
  };

  return (
    <div className="m grid grid-cols-4 gap-2">
      {tasks.map(
        (task) =>
          editModeTaskId === task.id && (
            <EditTaskModal
              key={task.id}
              task={task}
              onClose={handleCloseModal}
              onEdit={editTask} // Pasar la función editTask como prop
            />
          )
      )}
    </div>
  );
}

export default TaskEdit;
