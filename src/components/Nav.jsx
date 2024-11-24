import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-xl font-bold">
          <Link to="/">Mi Aplicación</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-300 hover:text-white">
              Acerca de
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-300 hover:text-white">
              Contacto
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
