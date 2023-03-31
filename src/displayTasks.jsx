import React from "react";

function DisplayTasks({ taskList, onDeleteTask }) {
  const handleDeleteTaskClick = (index) => {
    onDeleteTask(index);
  };
  return (
    <>
      {taskList.map((task, index) => (
        <div className="task-container">
          <div key={index} className="task-inner">
            <span>{task}</span>
            <span onClick={() => handleDeleteTaskClick(index)}>x</span>
          </div>
        </div>
      ))}
    </>
  );
}

export default DisplayTasks;
