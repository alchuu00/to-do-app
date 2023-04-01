import React from "react";

function DisplayTasks({ taskList, onDeleteTask }) {
  const handleDeleteTaskClick = (index) => {
    onDeleteTask(index);
  };
  return (
    <>
      {taskList.length === 0 ? (
        <p>No tasks to show</p>
      ) : (
        taskList.map((task, index) => (
          <div className="task-container" key={index}>
            <div className="task-inner">
              <span>{task}</span>
              <span onClick={() => onDeleteTask(index)}>x</span>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default DisplayTasks;
