//app.jsx

import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEdit from "./components/TaskEdit";
import ProductList from "./components/ProductList";

function App() {
  return (
    <main className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        {/* Cabecera del formulario */}
        <div className="mb-8">
          <TaskForm />
        </div>
        <TaskList />
        <TaskEdit />
        <ProductList />
      </div>
    </main>
  );
}

export default App;
