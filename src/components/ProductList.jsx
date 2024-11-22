import React, { useEffect, useState } from "react";
import { API_URL } from "../../backend/apiUrl.js";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${API_URL}/api/getProducts`);
        if (!response.ok) {
          throw new Error("Error al obtener los productos");
        }
        const data = await response.json();
        console.log(data);
        setProductos(data);
      } catch (error) {
        console.error("Error:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  if (loading) {
    return <p className="text-white">Cargando productos...</p>;
  }

  if (productos.length === 0) {
    return <p className="text-white">No hay productos disponibles</p>;
  }

  return (
    <div className="mt-5">
      <h2 className="text-white text-xl font-bold">Productos</h2>
      <ul className="mt-3">
        {productos.map((producto) => (
          <li
            key={producto.id}
            className="text-white bg-zinc-800 p-3 rounded-lg mb-2"
          >
            {producto.nombre} - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
