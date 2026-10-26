import axios from "axios";

// Creamos una instancia de Axios con la URL base de las variables de entorno
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Exportamos las funciones que interactúan con el backend
export const videojuegoService = {
  obtenerTodos() {
    return api.get("/videojuegos/");
  },
  registrar(nombre) {
    return api.post("/videojuegos/", { nombre });
  },
  eliminar(id) {
    return api.delete(`/videojuegos/${id}`);
  },
};