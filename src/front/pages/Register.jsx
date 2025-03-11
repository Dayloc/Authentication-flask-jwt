import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import storeReducer, { initialStore, register } from "./../store";

function Register() {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleRegister = async (e) => {
    e.preventDefault(); // Evitar recarga de página
    console.log("Enviando datos a register:", { email, password, isActive });

    const response = await register(dispatch, email, password, isActive);
    console.log("Response:", response); // Verificar qué devuelve la API

    if (response?.error) {
      alert("Error: " + response.error);
    } else {
      alert("Usuario creado con éxito.");
      navigate("/login"); // Redirigir a login si el registro es exitoso
    }

    // Limpiar campos después del registro
    setEmail("");
    setPassword("");
    setIsActive(false);
  };

  return (
    <div className="container justify-content-center align-items-center d-flex bg-black text-white">
      <div className="mt-3">
        <form onSubmit={handleRegister}> {/* ✅ Formulario con onSubmit */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isActive"
              checked={isActive} // ✅ Corrige el checkbox
              onChange={(e) => setIsActive(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="isActive">
              Activo
            </label>
          </div>
          <button type="submit" className="btn btn-primary mb-5">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
