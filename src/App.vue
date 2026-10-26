<script setup>
import { ref, onMounted } from "vue";
import { videojuegoService } from "./services/videojuegoService"; // <--- Importamos el servicio
import VideojuegoCard from "./components/VideoJuegoCard.vue";

const videojuegos = ref([]);
const nuevoNombre = ref("");

// 1. Obtener todos los videojuegos (GET)
const obtenerVideojuegos = async () => {
  try {
    const respuesta = await videojuegoService.obtenerTodos();
    videojuegos.value = respuesta.data;
  } catch (error) {
    console.error("Error al cargar los videojuegos:", error);
  }
};

// 2. Registrar un videojuego usando IA (POST)
const registrarVideojuego = async () => {
  if (!nuevoNombre.value.trim()) return;
  try {
    await videojuegoService.registrar(nuevoNombre.value);
    nuevoNombre.value = "";
    await obtenerVideojuegos();
  } catch (error) {
    console.error("Error al registrar:", error);
  }
};

// 3. Eliminar un videojuego (DELETE)
const eliminarVideojuego = async (id) => {
  try {
    await videojuegoService.eliminar(id);
    await obtenerVideojuegos();
  } catch (error) {
    console.error("Error al eliminar:", error);
  }
};

onMounted(() => {
  obtenerVideojuegos();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-8 font-sans">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        Gestor de Videojuegos 🎮
      </h2>

      <!-- Formulario -->
      <div class="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
        <input
          v-model="nuevoNombre"
          placeholder="Nombre del juego (ej: Zelda)..."
          @keyup.enter="registrarVideojuego"
          class="flex-1 max-w-md px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white shadow-sm text-gray-700"
        />
        <button
          @click="registrarVideojuego"
          class="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-md cursor-pointer"
        >
          Registrar con IA
        </button>
      </div>

      <!-- Cuadrícula de Tarjetas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <VideojuegoCard
          v-for="juego in videojuegos"
          :key="juego.id"
          :juego="juego"
          @eliminar="eliminarVideojuego"
        />
      </div>
    </div>
  </div>
</template>