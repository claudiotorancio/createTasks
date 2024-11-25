import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEdit from "./components/TaskEdit";
import ProductList from "./components/ProductList";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className="bg-zinc-900 min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        {/* Cabecera con barra de navegación */}
        <header className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          <div className="flex items-center justify-between">
            {/* Logo o Título */}
            <h1 className="text-white text-3xl font-bold">DoForms</h1>

            {/* Barra de navegación */}
            <nav className="lg:flex hidden items-center space-x-6">
              <ul className="flex space-x-6 text-white font-semibold">
                <li>
                  <Link
                    to="/"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tasks"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Lista de Tareas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    Productos
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Menú hamburguesa para móviles */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-white"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Menú desplegable para móviles */}
          {isMenuOpen && (
            <div className="lg:hidden bg-gray-800 mt-4 p-4 rounded-lg">
              <ul className="space-y-4 text-white font-semibold">
                <li>
                  <Link
                    to="/"
                    className="hover:text-indigo-500 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)} // Cerrar menú al hacer clic
                  >
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link
                    to="/tasks"
                    className="hover:text-indigo-500 transition-colors duration-300"
                    onClick={() => setIsMenuOpen(false)} // Cerrar menú al hacer clic
                  >
                    Lista de Tareas
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </header>

        {/* Contenido principal */}
        <div className="mb-8">
          <Routes>
            <Route path="/" element={<TaskForm />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/products" element={<ProductList />} />
          </Routes>
          <TaskEdit />
        </div>
      </div>
    </main>
  );
}

export default App;
