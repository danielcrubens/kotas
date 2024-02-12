<template>
  <div :style="{ backgroundColor: getTypeColor(type) }" class="rounded-xl text-white w-20 h-auto flex justify-around items-center">
    {{ type }}
  </div>
</template>

<script setup>
const props = defineProps({
  type: String
});

const getTypeColor = (type) => {
  const typeColors = {
    normal: '#C4C4C4',
    flying: '#5317FC',
    poison: '#AF08FE',
    ground: '#85826E',
    fire: '#FE0808',
    water: '#00A3FF',
    grass: '#08FEC3',
    electric: '#FFB800',
    fairy: '#FBA1EC',
    bug: '#9bba48'
  };
  return typeColors[type] || '#000';
};
</script>
