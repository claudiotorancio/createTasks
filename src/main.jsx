//main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { TaskContextProvider } from "./context/TaskContext";
import { AuthContextProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* Envolver tu aplicación con BrowserRouter */}
      <TaskContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </TaskContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
