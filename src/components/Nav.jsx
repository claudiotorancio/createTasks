import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        {/* Logo o Título */}
        <h1 className="text-white text-3xl font-bold">MDV</h1>

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
                Destacados
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
            <li>
              <Link
                to="/products"
                className="hover:text-indigo-500 transition-colors duration-300"
                onClick={() => setIsMenuOpen(false)} // Cerrar menú al hacer clic
              >
                Productos
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
