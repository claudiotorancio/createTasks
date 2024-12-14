//app.jsx

import { Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import ProductList from "./components/ProductList";
import Nav from "./components/Nav";
import Banner from "./components/banner";

function App() {
  return (
    <main className="bg-zinc-500 min-h-screen">
      <div className="container mx-auto p-4 sm:p-8">
        {/* Cabecera con barra de navegación */}
        <header className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
          {Nav()}
        </header>

        {/* Banner */}
        <Banner
          title="¡Bienvenido a nuestra tienda!"
          subtitle="Explora nuestros productos exclusivos"
          imageUrl="https://picture-alura.s3.us-east-2.amazonaws.com/1712622378820.jpg" // Reemplaza con tu URL
        />

        {/* Contenido principal */}
        <div className="mb-8">
          <Routes>
            <Route path="/" element={<TaskForm />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/products" element={<ProductList />} />
          </Routes>
        </div>
      </div>
    </main>
  );
}

export default App;
