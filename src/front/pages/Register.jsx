import React, { useState, useReducer } from "react";
import storeReducer, { initialStore, login,register } from "./../store";


function Register() {
  const [store, dispatch] = useReducer(storeReducer, initialStore);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

const handleRegister = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    const response = await register(dispatch, email, password, isActive);

    if (response.error) {
      alert("Error: " + response.error);
    } else {
      alert("Usuario creado con exito.");
      
    }

    setEmail("");
    setPassword("");
    isActive(false);
  };
  return (
    <div className="container justify-content-center align-items-center d-flex bg-black text-white">
    <div className="mt-3">
      <form onSubmit={handleRegister}>
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
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isActive"
            value={isActive}
            onChange={(e) => setIsActive(e.target.value)}
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


export default Register
