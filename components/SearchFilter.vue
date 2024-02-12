<template>
  <div class="search">
    <input class="flex py-3 pl-4 justify-center align-baseline items-center w-full rounded-xl" type="text" placeholder="Pesquise por nome ou código" v-model="searchTerm" @input="onSearch">
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['search']);
const searchTerm = ref('');

const onSearch = () => {
  emit('search', searchTerm.value);
};
</script>
