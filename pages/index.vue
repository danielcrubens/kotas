<template>
  <section class="mx-auto max-w-screen-xl px-4 md:px-24 overflow-y-scroll max-h-screen" ref="scrollContainer">

    <search-filter @search="handleSearch" />
    <section class="mx-auto max-w-screen-xl">
      <div v-if="isLoading" class="flex justify-center items-center h-screen">
        <Loading />
      </div>
      
      <div v-else-if="isError" class="flex justify-center items-center h-screen">
        <p class="text-red-500 font- medium">Erro ao carregar os dados. Por favor, tente novamente mais tarde.</p>
      </div>
      
      <div v-else class="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 grid-rows-4 gap-8 mt-5" ref="pokemonContainer">
        <pokemon-card v-for="pokemon in filteredPokemons" :key="pokemon.id" :pokemon="pokemon" />
      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue';
import { useInfiniteScroll } from '@vueuse/core';

const searchTerm = ref('');
const page = ref(0);
const isLoading = ref(false);
const isError = ref(false);
const pokemons = ref([]);

const loadPokemon = async () => {
  try {
    isLoading.value = true;

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${page.value * 10}&limit=10`);
    if (!response.ok) {
      throw new Error('Erro ao carregar os dados');
    }

    const { results } = await response.json();
    await Promise.all(results.map(async (result) => {
      const pokemonResponse = await fetch(result.url);
      if (!pokemonResponse.ok) {
        throw new Error('Erro ao carregar os dados do Pokémon');
      }

      const pokemon = await pokemonResponse.json();

      const existingPokemon = pokemons.value.find(p => p.id === pokemon.id);
      if (!existingPokemon) {
        pokemons.value.push({
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default,
          types: pokemon.types.map((type) => type.type.name)
        });
      }
    }));

    isError.value = false;
  } catch (error) {
    console.error('Erro ao carregar os dados:', error);
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};

watchEffect(() => {
  loadPokemon();
});

const orderedPokemons = computed(() => {
  return pokemons.value.sort((a, b) => a.id - b.id);
});

const filteredPokemons = computed(() => {
  if (!searchTerm.value) {
    return orderedPokemons.value;
  } else {
    const regex = new RegExp(searchTerm.value, 'i');
    return orderedPokemons.value.filter(pokemon => regex.test(pokemon.name) || pokemon.id.toString().startsWith(searchTerm.value));
  }
});

const scrollContainer = ref(null);
const pokemonContainer = ref(null);
useInfiniteScroll(scrollContainer, () => {
  page.value++;
}, { distance: 500 });

const handleSearch = (value) => {
  searchTerm.value = value;
};
</script>




