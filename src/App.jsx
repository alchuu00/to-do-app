import { Header } from "./Header";
import Footer from "./components/Footer";
import { Sidebar } from "./components/Sidebar";

import { TaskList } from "./components/TaskList";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <Sidebar />
        <TaskList />
      </div>
      <Footer />
    </>
  );
}

export default App;

// TODO clean up code
// add Firebase authentication + database
// Storybook