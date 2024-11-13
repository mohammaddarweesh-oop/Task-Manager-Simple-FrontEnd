import React from "react";

function Task({ task, onDelete, onEdit }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.completed ? "Completed" : "Pending"}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
}

export default Task;
