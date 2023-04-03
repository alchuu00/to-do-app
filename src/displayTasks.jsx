import React from "react";

function DisplayTasks({
  taskList,
  categoryList,
  onDeleteTask,
  onUpdateTaskCompletion,
  onUpdateTaskDate,
  onUpdateTaskName,
  selectedFilter,
}) {
  const handleDeleteTaskClick = (index) => {
    onDeleteTask(index);
  };

  const handleDateChange = (index, event) => {
    onUpdateTaskDate(index, event.target.value);
  };

  const handleTaskCompletionToggle = (index) => {
    const taskDate = new Date(taskList[index].date).toDateString();
    const todayDate = new Date().toDateString();
    if (taskDate === todayDate) {
      onUpdateTaskCompletion(index);
    } else {
      alert("You cannot update task completion for a date other than today!");
    }
  };

  const handleTaskNameChange = (index, newName) => {
    onUpdateTaskName(index, newName);
  };

  console.log(selectedFilter);

  let filteredTasks = taskList;
  if (selectedFilter === "Today") {
    filteredTasks = filteredTasks.filter(
      (task) => task.date === new Date().toISOString().slice(0, 10)
    );
  } else if (selectedFilter === "This Week") {
    const today = new Date();
    const startOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );
    const endOfWeek = new Date(
      today.setDate(today.getDate() - today.getDay() + 7)
    );
    filteredTasks = filteredTasks.filter(
      (task) =>
        task.date >= startOfWeek.toISOString().slice(0, 10) &&
        task.date <= endOfWeek.toISOString().slice(0, 10)
    );
  } else if (categoryList.includes(selectedFilter)) {
    filteredTasks = filteredTasks.filter(
      (task) => task.category === selectedFilter
    );
  }

  return (
    <>
      {filteredTasks.length === 0 ? (
        <p>No tasks to show</p>
      ) : (
        filteredTasks.map((task, index) => (
          <div className="task-container" key={index}>
            <div className="task-inner">
              <div className="task-add">
                <span
                  className="material-symbols-outlined clickable"
                  onClick={() => handleTaskCompletionToggle(index)}
                >
                  {task.completed ? "task_alt" : "radio_button_unchecked"}
                </span>
                <input
                className="task-input clickable"
                autoComplete="off"
                  type="text"
                  name="taskName"
                  value={task.name}
                  onChange={(event) =>
                    handleTaskNameChange(index, event.target.value)
                  }
                />
              </div>
              <div className="task-date-delete">
                <input
                  className="clickable"
                  type="date"
                  name="date"
                  value={task.date}
                  onChange={(event) => handleDateChange(index, event)}
                />
                <span onClick={() => handleDeleteTaskClick(index)}>
                  <span className="material-symbols-outlined clickable">
                    delete
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default DisplayTasks;
