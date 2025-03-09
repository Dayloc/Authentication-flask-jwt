import React, { useState, useReducer } from "react";
import storeReducer, { initialStore, login } from "./../store";

const Login = () => {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    const response = await login(dispatch, email, password);

    if (response.error) {
      alert("Error: " + response.error);
    } else {
      alert("Login exitoso, token guardado.");
      console.log("Token recibido:", store.token);
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
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
