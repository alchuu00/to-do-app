import { useState } from "react";
import Footer from "./Footer";
import TaskForm from "./TaskForm";
import DisplayTasks from "./displayTasks";

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const handleAddTaskClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowTaskForm(true);
  };

  const handleDeleteTask = (index) => {
    setTaskList(taskList.filter((task, i) => i !== index));
  };

  return (
    <>
      <header className="header">
        <i className="material-icons-outlined">done_all</i>
        <h1>Todo List</h1>
      </header>
      <div className="main-container">
        <div className="sidebar">
          <div className="sidebar-item">
            <span className="material-symbols-outlined">ballot</span>
            <span>All</span>
          </div>
          <div className="sidebar-item">
            <span className="material-symbols-outlined">today</span>
            <span>Today</span>
          </div>
          <div className="sidebar-item">
            <span className="material-symbols-outlined">date_range</span>
            <span>This week</span>
          </div>
          <h1 className="sidebar-title">Projects</h1>
          <div className="sidebar-item">
            <span className="material-symbols-outlined">add</span>
            <span>Add Project</span>
          </div>
        </div>
        <div className="content">
          <h1 className="task-title">All</h1>
            <DisplayTasks taskList={taskList} onDeleteTask={handleDeleteTask}/>
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
