<script setup>
defineProps({
  juego: Object,
});

defineEmits(["eliminar", "editar"]);
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
  >
    <div>
      <!-- Imagen de control de videojuegos -->
      <div class="mb-4 h-40 w-full overflow-hidden rounded-lg bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1606318801954-d46d46d3360a?q=80&w=500&auto=format&fit=crop"
          alt="Control de videojuegos"
          class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <!-- Cabecera con Título y Botón de Editar alineados -->
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="text-xl font-bold text-gray-800 leading-tight">
          {{ juego.titulo }}
        </h3>
        <button
          @click="$emit('editar', juego)"
          class="text-gray-400 hover:text-blue-600 transition-colors p-1 cursor-pointer shrink-0"
          title="Editar videojuego"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
      </div>

      <p class="text-sm text-gray-600 mb-1">
        <strong class="text-gray-700">Género:</strong> {{ juego.genero }}
      </p>
      <p class="text-sm text-gray-600 mb-1">
        <strong class="text-gray-700">Año:</strong> {{ juego.anio }}
      </p>
      <p class="text-sm text-gray-600 mb-4">
        <strong class="text-gray-700">Desarrollador:</strong>
        {{ juego.desarrollador }}
      </p>
    </div>

    <button
      @click="$emit('eliminar', juego.id)"
      class="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors cursor-pointer shadow-sm"
    >
      Eliminar
    </button>
  </div>
</template>