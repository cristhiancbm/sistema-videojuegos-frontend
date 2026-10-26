<script setup>
import { reactive, watch } from "vue";
import { videojuegoService } from "../services/videojuegoService";

const props = defineProps({
  isOpen: Boolean,
  juegoId: [Number, String],
});

const emit = defineEmits(["cerrar", "guardado"]);

const form = reactive({
  titulo: "",
  genero: "",
  anio: "",
  desarrollador: "",
});

// Vigilamos cuando el modal se abre y tenemos un ID disponible
watch(
  () => props.isOpen,
  async (abierto) => {
    if (abierto && props.juegoId) {
      try {
        console.log("Consultando videojuego con ID:", props.juegoId);
        const respuesta = await videojuegoService.obtenerPorId(props.juegoId);
        console.log("Datos recibidos:", respuesta.data);

        // Rellenamos el formulario con los datos obtenidos
        Object.assign(form, respuesta.data);
      } catch (error) {
        console.error("Error al obtener el videojuego por ID:", error);
      }
    }
  },
);

const guardar = async () => {
  try {
    await videojuegoService.actualizar(props.juegoId, {
      titulo: form.titulo,
      genero: form.genero,
      anio: Number(form.anio),
      desarrollador: form.desarrollador,
    });
    emit("guardado");
    emit("cerrar");
  } catch (error) {
    console.error("Error al actualizar:", error);
  }
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50"
  >
    <div
      class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-gray-100"
    >
      <h3 class="text-xl font-bold text-gray-800 mb-4">Editar Videojuego</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Título</label
          >
          <input
            v-model="form.titulo"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Género</label
          >
          <input
            v-model="form.genero"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Año</label
          >
          <input
            type="number"
            v-model="form.anio"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Desarrollador</label
          >
          <input
            v-model="form.desarrollador"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none text-gray-700"
          />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-6">
        <button
          @click="$emit('cerrar')"
          class="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium cursor-pointer transition-colors"
        >
          Cancelar
        </button>
        <button
          @click="guardar"
          class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium cursor-pointer transition-colors shadow-sm"
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
</template>