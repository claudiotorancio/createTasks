import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEdit from "./components/TaskEdit";
import ProductList from "./components/ProductList";

function App() {
  return (
    <main className="bg-zinc-900 h-screen">
      <div className="container mx-auto p-10">
        <TaskForm />
        <TaskList />
        <TaskEdit />
        <ProductList /> {/* Mostrar productos */}
      </div>
    </main>
  );
}

export default App;
