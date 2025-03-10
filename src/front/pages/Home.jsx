import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
    const navigate = useNavigate(); // Hook para redireccionar
    const token = localStorage.getItem("token");
    const { store, dispatch } = useGlobalReducer();

    const loadMessage = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file");

            const response = await fetch(backendUrl + "/api/hello");
            const data = await response.json();

            if (response.ok) dispatch({ type: "set_hello", payload: data.message });

            return data;
        } catch (error) {
            console.error(
                "Could not fetch the message from the backend. Please check if the backend is running and the backend port is public."
            );
        }
    };

    useEffect(() => {
        if (token) {
            navigate("/profile"); // Redirige si hay token
        } else {
            loadMessage();
        }
    }, [token, navigate]); // Dependencias

    return (
        <div className="text-center mt-5">
            <h1 className="display-4">Hello Rigo!!</h1>
            <p className="lead">
                <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
            </p>
            <div className="alert alert-info">
                {store.message ? (
                    <span>{store.message}</span>
                ) : (
                    <span className="text-danger">
                        Loading message from the backend (make sure your Python 🐍 backend is running)...
                    </span>
                )}
            </div>
        </div>
    );
};
