import { useState, useEffect } from "react";
import Footer from "./Footer";
import TaskForm from "./TaskForm";
import DisplayTasks from "./displayTasks";

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleAddTaskClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowTaskForm(true);
  };

  const handleDeleteTask = (index) => {
    setTaskList((taskList) => taskList.filter((task, i) => i !== index));
  };

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTaskList(storedTasks);
    }
  }, []);

  useEffect(() => {
    if (taskList.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(taskList));
    } else {
      localStorage.removeItem("tasks");
    }
  }, [taskList]);

  function onUpdateTaskCompletion(index) {
    setTaskList((prevTaskList) => {
      const updatedTaskList = [...prevTaskList];
      updatedTaskList[index] = {
        ...updatedTaskList[index],
        completed: !updatedTaskList[index].completed,
      };
      return updatedTaskList;
    });
  }

  function onUpdateTaskDate(index, newDate) {
    setTaskList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index].date = newDate;
      return updatedList;
    });
  }

  return (
    <>
      <header className="header">
        <i className="material-icons-outlined">done_all</i>
        <h1>Todo List</h1>
      </header>
      <div className="main-container">
        <div className="sidebar">
          <div
            className="sidebar-item"
            onClick={() => setSelectedFilter("All")}
          >
            <span className="material-symbols-outlined">ballot</span>
            <span>All</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => setSelectedFilter("Today")}
          >
            <span className="material-symbols-outlined">today</span>
            <span>Today</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => setSelectedFilter("This Week")}
          >
            <span className="material-symbols-outlined">date_range</span>
            <span>This week</span>
          </div>

          <h1 className="sidebar-title">Lists</h1>
          <div className="sidebar-item">
            <span className="material-symbols-outlined">add</span>
            <span>Add List</span>
          </div>
        </div>
        <div className="content">
          <h1 className="task-title">{selectedFilter}</h1>
          <DisplayTasks
            taskList={taskList}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskCompletion={onUpdateTaskCompletion}
            onUpdateTaskDate={onUpdateTaskDate}
            selectedFilter={selectedFilter}
          />
          <div className="task-container">
            {!showTaskForm && (
              <div className="task-add" onClick={handleAddTaskClick}>
                <div>+</div>
                <div>Add Task</div>
              </div>
            )}
            {showTaskForm && (
              <TaskForm
                taskList={taskList}
                setTaskList={setTaskList}
                setShowTaskForm={setShowTaskForm}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
