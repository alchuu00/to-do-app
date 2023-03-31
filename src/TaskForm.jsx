import React, { useState } from "react";

function TaskForm({ setTaskList, setShowTaskForm }) {
  const [taskInputValue, setTaskInputValue] = useState("");

  const handleCancelTaskClick = () => {
    setShowTaskForm(false);
  };

  const handleFormSubmit = (event) => {
    console.log("task submitted");
    event.preventDefault();
    event.stopPropagation();
    if (taskInputValue.trim() !== "") {
      setTaskList((taskList) => [...taskList, taskInputValue.trim()]);
      setTaskInputValue("");
      setShowTaskForm(false);
    }
  };

  console.log(taskInputValue);

  return (
    <form className="task-form" onSubmit={handleFormSubmit}>
      <input
        autoComplete="false"
        type="text"
        name="taskInput"
        placeholder="Type your task..."
        className="task-form"
        value={taskInputValue}
        onChange={(event) => setTaskInputValue(event.target.value)}
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
