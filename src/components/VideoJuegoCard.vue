<script setup>
defineProps({
  juego: Object,
});

defineEmits(["eliminar"]);
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
  >
    <div>
      <h3 class="text-xl font-bold text-gray-800 mb-2">{{ juego.titulo }}</h3>
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
