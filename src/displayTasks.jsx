import React from "react";

function DisplayTasks({
  taskList,
  categoryList,
  handleDeleteTask,
  onUpdateTaskCompletion,
  onUpdateTaskDate,
  onUpdateTaskName,
  selectedFilter,
}) {
  const handleDeleteTaskClick = (id) => {
    handleDeleteTask(id);
  };

  const handleDateChange = (id, event) => {
    onUpdateTaskDate(id, event.target.value);
  };

  const handleTaskCompletionToggle = (id) => {
    console.log("handleCompletitionToggle" + " " + id);
    const task = taskList.find((task) => task.id === id);
    const taskDate = new Date(task.date).toDateString();
    const todayDate = new Date().toDateString();
    if (taskDate === todayDate) {
      onUpdateTaskCompletion(task.id);
    } else {
      alert("You cannot update task completion for a date other than today!");
    }
  };

  const handleTaskNameChange = (id, newName) => {
    onUpdateTaskName(id, newName);
  };

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
        filteredTasks.map((task) => (
          <div className="task-container" key={task.id}>
            <div className="task-inner">
              <div className="task-add">
                <span
                  className="material-symbols-outlined clickable"
                  onClick={() => handleTaskCompletionToggle(task.id)}
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
                    handleTaskNameChange(task.id, event.target.value)
                  }
                />
              </div>
              <div className="task-date-delete">
                <input
                  className="clickable"
                  type="date"
                  name="date"
                  value={task.date}
                  onChange={(event) => handleDateChange(task.id, event)}
                />
                <span onClick={() => handleDeleteTaskClick(task.id)}>
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
