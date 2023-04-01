import React from "react";

function DisplayCategories({ categoryList, onDeleteCategory }) {
  const handleDeleteCategoryClick = (index) => {
    onDeleteCategory(index);
  };

  return (
    <>
      {categoryList.map((category, index) => (
        <div className="task-inner" key={index}>
          {category}
          <button onClick={() => handleDeleteCategoryClick(index)}>
            x
          </button>
        </div>
      ))}
    </>
  );
}

export default DisplayCategories;
