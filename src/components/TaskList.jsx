import { useState } from "react";
import TaskForm from "./TaskForm";
import DisplayTasks from "./DisplayTasks";
import { useLocalStorage } from "react-use";

export function TaskList() {
  const [categoryList] = useAtom(categoryListAtom);
  const [selectedFilter] = useAtom(selectedFilterAtom);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

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
