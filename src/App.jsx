import { useState } from "react";
import Footer from "./components/Footer";
import TaskForm from "./components/TaskForm";
import DisplayTasks from "./components/DisplayTasks";
import { Sidebar } from "./components/Sidebar";
import { useLocalStorage } from "react-use";

function App() {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [categoryList, setCategoryList] = useLocalStorage("categories", []);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleAddCategoryClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowCategoryForm(true);
  };

  const handleDeleteCategory = (index) => {
    setCategoryList((categoryList) =>
      categoryList.filter((category, i) => i !== index)
    );
  };

  function onFilterByCategory(categoryName) {
    setSelectedFilter(categoryName);
  }

  return (
    <>
      <Header />
      <div className="main-container">
        <Sidebar
          setSelectedFilter={setSelectedFilter}
          setSelectedCategory={setSelectedCategory}
          categoryList={categoryList}
          handleDeleteCategory={handleDeleteCategory}
          onFilterByCategory={onFilterByCategory}
          showCategoryForm={showCategoryForm}
          handleAddCategoryClick={handleAddCategoryClick}
          setCategoryList={setCategoryList}
          selectedCategory={selectedCategory}
          setShowCategoryForm={setShowCategoryForm}
        />
        <TaskList
          selectedCategory={selectedCategory}
          selectedFilter={selectedFilter}
          // taskList={taskList}
          // categoryList={categoryList}
          // handleDeleteTask={handleDeleteTask}
          // onUpdateTaskCompletion={onUpdateTaskCompletion}
          // onUpdateTaskDate={onUpdateTaskDate}
          // onUpdateTaskName={onUpdateTaskName}
          // showAddTaskButton={showAddTaskButton}
          // handleAddTaskClick={handleAddTaskClick}
          // showTaskForm={showTaskForm}
          // setTaskList={setTaskList}
          // setShowTaskForm={setShowTaskForm}
          // selectedCategory={selectedCategory}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
function Header() {
  return (
    <header className="header">
      <i className="material-icons-outlined">done_all</i>
      <h1>Todo List</h1>
    </header>
  );
}

function TaskList({ selectedFilter }) {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskList, setTaskList] = useLocalStorage("tasks", []);

  const handleAddTaskClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowTaskForm(true);
  };

  const handleDeleteTask = (id) => {
    setTaskList((taskList) => taskList.filter((task) => task.id !== id));
  };

  function onUpdateTaskCompletion(id) {
    console.log("onUpdateTaskCompletition" + " " + id);
    setTaskList((prevTaskList) => {
      const updatedTaskList = [...prevTaskList];
      const index = updatedTaskList.findIndex((task) => task.id === id);
      if (index >= 0) {
        updatedTaskList[index] = {
          ...updatedTaskList[index],
          completed: !updatedTaskList[index].completed,
        };
      }
      return updatedTaskList;
    });
  }

  function onUpdateTaskName(id, newName) {
    setTaskList((prevList) => {
      const index = prevList.findIndex((task) => task.id === id);
      const updatedList = [...prevList];
      updatedList[index].name = newName;
      return updatedList;
    });
  }

  function onUpdateTaskDate(id, newDate) {
    setTaskList((prevList) => {
      const index = prevList.findIndex((task) => task.id === id);
      const updatedList = [...prevList];
      updatedList[index].date = newDate;
      return updatedList;
    });
  }

  const showAddTaskButton =
    !showTaskForm &&
    (selectedFilter === "All" || selectedFilter === selectedCategory);
  return (
    <div className="content">
      <h1 className="task-title">{selectedFilter}</h1>
      <h1 className="task-category">{selectedCategory}</h1>
      <DisplayTasks
        taskList={taskList}
        categoryList={categoryList}
        handleDeleteTask={handleDeleteTask}
        onUpdateTaskCompletion={onUpdateTaskCompletion}
        onUpdateTaskDate={onUpdateTaskDate}
        onUpdateTaskName={onUpdateTaskName}
        selectedFilter={selectedFilter}
      />
      <div className="task-container">
        {showAddTaskButton && (
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
  );
}
