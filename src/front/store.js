export const initialStore = () => {
  return {
    message: null,
    token: null,
    users: [],
  };
};
export const login = async (dispatch, email, password) => {
  try {
    const response = await fetch(
      "https://cautious-space-memory-4jj4xwj6pqvq26w6-3001.app.github.dev/api/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en el login:", errorData);
      return { error: errorData.message || "Usuario no registrado, por favor registrese." };
    }

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (data.token) {
      // Guardar el token en el store
      dispatch({ type: "set_token", payload: data.token });
      localStorage.setItem("token", data.token);
      return data;
      
    } else {
      return { error: "No se recibió un token válido." };
    }
  } catch (error) {
    console.error("Error en la solicitud de login:", error);
    return { error: "No se pudo conectar con el servidor." };
  }
};
export const register = async (dispatch, email, password, isActive) => {
  try {
    const response = await fetch(
      "https://cautious-space-memory-4jj4xwj6pqvq26w6-3001.app.github.dev/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, isActive }),
      }
    );

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error en el login:", errorData);
      return { error: errorData.message || "Error desconocido en login" };
    }

    const data = await response.json();
    console.log("Respuesta del servidor:", data);
  } catch (error) {
    console.error("Error en la solicitud de login:", error);
    return { error: "No se pudo conectar con el servidor." };
  }
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };
    case "set_token":
      return {
        ...store,
        token: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };
    default:
      throw Error("Unknown action.");
  }
}
