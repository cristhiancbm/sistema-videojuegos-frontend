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
  obtenerPorId(id) {
    return api.get(`/videojuegos/${id}`);
  },
  registrar(nombre) {
    return api.post("/videojuegos/", { nombre });
  },
  actualizar(id, datos) {
    return api.patch(`/videojuegos/${id}`, datos);
  },
  eliminar(id) {
    return api.delete(`/videojuegos/${id}`);
  },
};