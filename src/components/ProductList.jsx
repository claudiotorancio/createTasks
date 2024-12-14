import React, { useEffect, useState } from "react";
import { fetchProductos } from "../services/productoServices";

const ProductList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProductos = async () => {
      try {
        const data = await fetchProductos();
        setProductos(data);
      } catch (error) {
        console.error("Error al cargar productos:", error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProductos();
  }, []);

  if (loading) {
    return <p className="text-white">Cargando productos...</p>;
  }

  if (productos.length === 0) {
    return <p className="text-white"></p>;
  }

  return (
    <div className="mt-5">
      <h2 className="text-black text-3xl font-bold mb-4 text-center">
        Productos
      </h2>
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
