import { useState, useEffect } from "react";
import Footer from "./Footer";
import TaskForm from "./TaskForm";
import DisplayTasks from "./DisplayTasks";
import CategoryForm from "./CategoryForm";
import DisplayCategories from "./DisplayCategories";

function App() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddTaskClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowTaskForm(true);
  };

  const handleAddCategoryClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowCategoryForm(true);
  };

  const handleDeleteTask = (index) => {
    setTaskList((taskList) => taskList.filter((task, i) => i !== index));
  };

  const handleDeleteCategory = (index) => {
    setCategoryList((categoryList) =>
      categoryList.filter((category, i) => i !== index)
    );
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

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories"));
    if (storedCategories) {
      setCategoryList(storedCategories);
    }
  }, []);

  useEffect(() => {
    if (categoryList.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categoryList));
    } else {
      localStorage.removeItem("categories");
    }
  }, [categoryList]);

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

  function onUpdateTaskName(index, newName) {
    setTaskList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index].name = newName;
      return updatedList;
    });
  }  

  function onUpdateTaskDate(index, newDate) {
    setTaskList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index].date = newDate;
      return updatedList;
    });
  }

  function onFilterByCategory(categoryName) {
    setSelectedFilter(categoryName);
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
            onClick={() => {
              setSelectedFilter("All");
              setSelectedCategory("");
            }}
          >
            <span className="material-symbols-outlined">ballot</span>
            <span>All</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => {
              setSelectedFilter("Today");
              setSelectedCategory("");
            }}
          >
            <span className="material-symbols-outlined">today</span>
            <span>Today</span>
          </div>
          <div
            className="sidebar-item"
            onClick={() => {
              setSelectedFilter("This Week");
              setSelectedCategory("");
            }}
          >
            <span className="material-symbols-outlined">date_range</span>
            <span>This week</span>
          </div>

          <h1 className="sidebar-title">Lists</h1>
          <DisplayCategories
            categoryList={categoryList}
            onDeleteCategory={handleDeleteCategory}
            onFilterByCategory={onFilterByCategory}
            setSelectedCategory={setSelectedCategory}
          />
          {!showCategoryForm && (
            <div className="sidebar-item" onClick={handleAddCategoryClick}>
              <span className="material-symbols-outlined">add</span>
              <span>Add List</span>
            </div>
          )}
          {showCategoryForm && (
            <CategoryForm
              categoryList={categoryList}
              setCategoryList={setCategoryList}
              setShowCategoryForm={setShowCategoryForm}
            />
          )}
        </div>
        <div className="content">
          <h1 className="task-title">{selectedFilter}</h1>
          <DisplayTasks
            taskList={taskList}
            categoryList={categoryList}
            onDeleteTask={handleDeleteTask}
            onUpdateTaskCompletion={onUpdateTaskCompletion}
            onUpdateTaskDate={onUpdateTaskDate}
            onUpdateTaskName={onUpdateTaskName}
            selectedFilter={selectedFilter}
          />
          <div className="task-container">
            {!showTaskForm && (
              <div className="task-input clickable" onClick={handleAddTaskClick}>
                <div>+</div>
                <div>Add Task</div>
              </div>
            )}
            {showTaskForm && (
              <TaskForm
                taskList={taskList}
                setTaskList={setTaskList}
                setShowTaskForm={setShowTaskForm}
                selectedCategory={selectedCategory}
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
