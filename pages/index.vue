<template>
  <div>
    <input type="text" placeholder="Pesquisar Pokémon por ID ou Nome" v-model="searchTerm" @input="searchPokemon">
    <div v-if="pending">Carregando...</div>
    <div v-else-if="error">Erro ao carregar os dados dos Pokémons.</div>
    <div class="grid grid-cols-5 grid-rows-4 gap-4" ref="el">
      <div v-for="pokemon in filteredPokemonList" :key="pokemon.name">
        <div>
          <h2>{{ pokemon.name }}</h2>
          <img :src="pokemon.image" :alt="pokemon.name">
          <p>ID: {{ pokemon.id }}</p>
          <p>Type: {{ pokemon.type }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

const searchTerm = ref('');
const page = ref(0);
const pokemonList = ref([]);

onMounted(() => {
  loadPokemon();
});

const loadPokemon = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=24&offset=${page.value * 24}`);
  const data = await response.json();
  const pokemons = await Promise.all(data.results.map(async (pokemon) => {
    const pokemonDataResponse = await fetch(pokemon.url);
    const pokemonData = await pokemonDataResponse.json();
    const types = pokemonData.types.map(type => type.type.name).join(', ');
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      type: types
    };
  }));
  pokemonList.value = [...pokemonList.value, ...pokemons];
};

const el = ref(null);

useInfiniteScroll(
  el,
  () => {
    page.value++;
    loadPokemon();
  },
  { distance: 10 },
);

const filteredPokemonList = computed(() => {
  if (!searchTerm.value) {
    return pokemonList.value;
  } else {
    const regex = new RegExp(searchTerm.value, 'i');
    return pokemonList.value.filter(pokemon => regex.test(pokemon.name) || pokemon.id.toString() === searchTerm.value);
  }
});

</script>
