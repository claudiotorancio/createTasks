import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Elementos del menú
  const menuItems = [
    { name: "Inicio", path: "/" },
    { name: "Destacados", path: "/tasks" },
    { name: "Productos", path: "/products" },
  ];

  // Botón de iniciar sesión
  const authLinks = (
    <div className="space-x-4">
      <Link
        to="/login"
        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg"
      >
        Iniciar Sesión
      </Link>
    </div>
  );

  return (
    <div>
      {/* Barra de navegación para escritorio */}
      <div className="flex items-center justify-between">
        {/* Logo o Título */}
        <h1 className="text-white text-3xl font-bold">MDV</h1>

        {/* Barra de navegación (Escritorio) */}
        <nav className="lg:flex hidden items-center space-x-6">
          <ul className="flex space-x-6 text-white font-semibold">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="hover:text-indigo-500 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {authLinks}
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
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="hover:text-indigo-500 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)} // Cerrar menú al hacer clic
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {authLinks}
        </div>
      )}
    </div>
  );
};

export default Nav;
