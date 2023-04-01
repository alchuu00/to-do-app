import React from "react";

function DisplayTasks({ taskList, onDeleteTask, onUpdateTaskDate, onUpdateTaskCompletion }) {
  const handleDeleteTaskClick = (index) => {
    onDeleteTask(index);
  };

  const handleDateChange = (index, event) => {
    onUpdateTaskDate(index, event.target.value);
  };

  const handleTaskCompletionToggle = (index) => {
    onUpdateTaskCompletion(index);
  };

  return (
    <>
      {taskList.length === 0 ? (
        <p>No tasks to show</p>
      ) : (
        taskList.map((task, index) => (
          <div className="task-container" key={index}>
            <div className="task-inner">
              <div className="task-add">
                <span className="material-symbols-outlined" onClick={() => handleTaskCompletionToggle(index)}>
                  {task.completed ? "task_alt" : "radio_button_unchecked"}
                </span>
                <span>{task.name}</span>
              </div>
              <div className="task-add">
                <input
                  type="date"
                  name="date"
                  value={task.date}
                  onChange={(event) => handleDateChange(index, event)}
                />
                <span onClick={() => handleDeleteTaskClick(index)}>x</span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default DisplayTasks;
