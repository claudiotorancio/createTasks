// loginRegister.jsx
import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

const LoginRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Estados para controlar los mensajes de alerta
  const [alerta, setAlerta] = useState({
    mostrar: false,
    mensaje: "",
    tipo: "",
  });

  const { login, register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Limpiamos alertas previas al enviar
    setAlerta({ mostrar: false, mensaje: "", tipo: "" });

    try {
      if (isLogin) {
        // Iniciar sesión
        await login(email, password);
        setAlerta({
          mostrar: true,
          mensaje: "¡Inicio de sesión exitoso! Redirigiendo...",
          tipo: "success",
        });
      } else {
        // Registrarse
        await register(email, password);
        setAlerta({
          mostrar: true,
          mensaje: "¡Usuario registrado con éxito! Ya puedes iniciar sesión.",
          tipo: "success",
        });

        // Opcional: Limpiar campos tras registrarse
        setEmail("");
        setPassword("");
        // Podrías pasar a la pantalla de login automáticamente tras 2 segundos:
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setAlerta({
        mostrar: true,
        mensaje:
          error.response?.data?.message ||
          "Hubo un error en el servidor. Inténtalo de nuevo.",
        tipo: "error",
      });
    }
  };

  // Alternar pantallas limpiando la alerta
  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setAlerta({ mostrar: false, mensaje: "", tipo: "" });
  };

  return (
    <div>
      <h2 className="text-black text-3xl font-bold mb-4 text-center">Login</h2>

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        {/* --- COMPONENTE DE ALERTA DINÁMICA --- */}
        {alerta.mostrar && (
          <div
            className={`p-3 mb-4 rounded-lg text-sm font-medium ${
              alerta.tipo === "success"
                ? "bg-green-100 text-green-800 border border-green-200"
                : "bg-red-100 text-red-800 border border-red-200"
            }`}
          >
            {alerta.mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              type="email"
              className="w-full p-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-lg w-full font-semibold hover:bg-indigo-600 transition-colors"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <span>
            {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?"}{" "}
            <button
              onClick={handleToggleMode}
              className="text-indigo-500 font-semibold hover:underline"
            >
              {isLogin ? "Registrarse" : "Iniciar Sesión"}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
