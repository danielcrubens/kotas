<template>
  <NuxtLink :to="`/${pokemon.id}`">
    <div class="bg-white rounded-xl w-full h-full shadow-lg hover:shadow-xl" @click="selectPokemon">
      <div class="object-cover ">
        <img class="m-auto h-20 w-20" :src="pokemon.image" :alt="pokemon.name">
      </div>
      <div class="text-center">
        <h2 class="font-bold -mt-1">{{ pokemon.name }}</h2>
        <p class="font-medium">Cod: {{ pokemon.id }}</p>
        <div class="mt-8 pb-8 px-1 gap-2 flex justify-evenly items-center">
          <div v-for="type in pokemon.types" :key="type">
            <TypeColorPicker :type="type" />
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  pokemon: Object
});

const emit = defineEmits(['selectPokemon']);

const selectPokemon = () => {
  emit('selectPokemon', props.pokemon);
};
</script>
