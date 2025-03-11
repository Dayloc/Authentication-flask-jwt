import React, { useState, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate
import storeReducer, { initialStore, login } from "./../store";

const Login = () => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Inicializar useNavigate

  // Redirigir a /profile si el usuario ya está autenticado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const response = await login(dispatch, email, password);
  
    if (response.error) {
      alert("Error: " + response.error);
      navigate("/register"); // Redirigir a /register si hay error
    } else {
      alert("Login exitoso, token guardado.");
      
      // Guardar el token y la información del usuario en localStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user)); 
      
      navigate("/profile"); // Redirigir a profile si el login es exitoso
    }
  
    setEmail("");
    setPassword("");
  };
  

  return (
    <div className="container justify-content-center align-items-center d-flex">
      <div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
