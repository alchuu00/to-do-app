import React from "react";

function DisplayCategories({ categoryList, onDeleteCategory, onFilterByCategory, setSelectedCategory }) {
  const handleDeleteCategoryClick = (index) => {
    onDeleteCategory(index);
  };

  const handleFilterByCategoryClick = (category) => {
    onFilterByCategory(category);
  }

  return (
    <>
      {categoryList.map((category, index) => (
        <div className="sidebar-category" key={index} onClick={() => setSelectedCategory(category)}>
          <div className="sidebar-item">
            <a href="#" onClick={() => handleFilterByCategoryClick(category)}>
              <span className="material-symbols-outlined">list_alt</span>
              {category}
            </a>
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
