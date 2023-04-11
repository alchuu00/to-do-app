import React, { useState, useEffect } from "react";

function CategoryForm({categoryList, setCategoryList, setShowCategoryForm}) {
  const [categoryName, setCategoryName] = useState("");

  const handleCancelCategoryClick = () => {
    setShowCategoryForm(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (categoryName.trim() !== "") {
      setCategoryList((categoryList) => [...categoryList, categoryName]);
      setCategoryName("");
      setShowCategoryForm(false);
    }
  };

  return (
    <form className="task-form" onSubmit={handleFormSubmit}>
      <input
        autoComplete="off"
        type="text"
        name="categoryInput"
        placeholder="List name..."
        className="task-form"
        value={categoryName}
        onChange={(event) => setCategoryName(event.target.value)}
      />
      <div className="task-form-btns">
        <button type="submit" className="task-add-btn">
          Add
        </button>
        <button onClick={handleCancelCategoryClick} className="task-cancel-btn">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CategoryForm;
