import React from "react";

function DisplayCategories({ categoryList, onDeleteCategory }) {
  const handleDeleteCategoryClick = (index) => {
    onDeleteCategory(index);
  };

  return (
    <>
      {categoryList.map((category, index) => (
        <div className="sidebar-category" key={index}>
          <div className="sidebar-item">
            <span className="material-symbols-outlined">list_alt</span>
            {category}
          </div>
          <button onClick={() => handleDeleteCategoryClick(index)}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      ))}
    </>
  );
}

export default DisplayCategories;
