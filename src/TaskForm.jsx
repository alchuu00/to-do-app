import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function TaskForm({ taskList, setTaskList, setShowTaskForm, selectedCategory }) {
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");

  const handleCancelTaskClick = () => {
    setShowTaskForm(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (taskName.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        completed: false,
        name: taskName.trim(),
        date: taskDate.trim(),
        category: selectedCategory ? selectedCategory : "",
      };
      setTaskList((taskList) => [...taskList, newTask]);
      setTaskName("");
      setTaskDate("");
      setShowTaskForm(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleFormSubmit}>
      <input
        autoComplete="off"
        type="text"
        name="taskInput"
        placeholder="Type your task..."
        className="task-form"
        value={taskName}
        onChange={(event) => setTaskName(event.target.value)}
      />
      <div className="task-form-btns">
        <button type="submit" className="task-add-btn">
          Add
        </button>
        <button onClick={handleCancelTaskClick} className="task-cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;
