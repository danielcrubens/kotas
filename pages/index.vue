<template>
    <div>
      <input type="text" placeholder="Pesquisar Pokémon por ID ou Nome" v-model="searchTerm" @input="searchPokemon">
      <div v-if="pending">Carregando...</div>
      <div v-else-if="error">Erro ao carregar os dados dos Pokémons.</div>
      <div v-else>
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
  import { ref, computed } from 'vue';
  
  const searchTerm = ref('');
  const { data: pokemonList, pending, error } = useAsyncData("pokemon-list", async () => {
    const response = await $fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=100');
    const pokemonDetails = await Promise.all(response.results.map(async (pokemon) => {
      const pokemonData = await $fetch(pokemon.url);
      const types = pokemonData.types.map(type => type.type.name).join(', ');
      return {
        id: pokemonData.id,
        name: pokemonData.name,
        image: pokemonData.sprites.front_default,
        type: types
      };
    }));
    return pokemonDetails;
  }, { lazy: true });
  
  const filteredPokemonList = computed(() => {
    if (!searchTerm.value) {
      return pokemonList.value;
    } else {
      const regex = new RegExp(searchTerm.value, 'i');
      return pokemonList.value.filter(pokemon => regex.test(pokemon.name) || pokemon.id.toString() === searchTerm.value);
    }
  });
  
  </script>
  