import CategoryForm from "./CategoryForm";
import DisplayCategories from "./DisplayCategories";

export function Sidebar({
  setSelectedFilter,
  setSelectedCategory,
  selectedCategory,
  categoryList,
  handleDeleteCategory,
  onFilterByCategory,
  showCategoryForm,
  handleAddCategoryClick,
  setCategoryList,
  setShowCategoryForm,
}) {
  return (
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
  );
}
