import React, { useState, useEffect } from "react";

function TaskForm({ taskList, setTaskList, setShowTaskForm }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleCancelTaskClick = () => {
    setShowTaskForm(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (taskName.trim() !== "") {
      setTaskList((taskList) => [
        ...taskList,
        {
          completed: false,
          name: taskName.trim(),
          date: taskDate.trim(),
        },
      ]);
      setTaskName("");
      setTaskDate("");
      setShowTaskForm(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleFormSubmit}>
      <input
        autoComplete="false"
        type="text"
        name="taskInput"
        placeholder="Type your task..."
        className="task-form"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <div className="task-form-btns">
        <button type="submit" className="task-add-btn">
          Add Task
        </button>
        <button onClick={handleCancelTaskClick} className="task-cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
