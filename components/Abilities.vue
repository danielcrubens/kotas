<template>
    <ul class="w-full">
      <li v-for="ability in abilities" :key="ability" class="py-5 text-sm mt-5  text-gray-600 h-11 border-t border-gray-200 flex justify-center items-center px-2 w-12/12">{{ ability }}</li>
    </ul>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  
  const props = defineProps({
    abilities: Array
  });
  </script>
  