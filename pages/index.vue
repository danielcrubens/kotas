<template>
    <section class="mx-auto max-w-screen-xl px-4  md:px-24 overflow-y-scroll max-h-screen">

  <input class="flex py-3 pl-4  justify-center align-baseline items-center w-full rounded-xl" type="text" placeholder="Pesquise po nome ou código" v-model="searchTerm" @input="searchPokemon">
  
  <section class="mx-auto max-w-screen-xl ">

     <div  class="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 grid-rows-4 gap-8 mt-5" ref="el">
        <div class="bg-white rounded-xl w-full h-full shadow-lg hover:shadow-xl" v-for="pokemon in filteredPokemonList" :key="pokemon.name">
           <div class="text-center ">
              <div class="object-cover">
                 <img class=" m-auto h-24 w-28" :src="pokemon.image" :alt="pokemon.name">
              </div>
              <h2 class="font-bold -mt-1">{{ pokemon.name }}</h2>
              <p class="font-medium">Cod: {{ pokemon.id }}</p>
              <div class="mt-8 pb-8 px-1  gap-2 flex justify-evenly items-center">
                 <div v-for="type in pokemon.types" :key="type" class=" rounded-xl text-white w-20 h-auto  flex justify-around items-center" :style="{ backgroundColor: getTypeColor(type) }">{{ type }}</div>
              </div>
           </div>
        </div>
     </div>
  </section>
  </section>
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
    const types = pokemonData.types.map(type => type.type.name); 
    return {
      id: pokemonData.id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
      types: types
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
const getTypeColor = (type) => {
  const typeColors = {
    normal: '#C4C4C4',
    flying: '#5317FC',
    poison: '#AF08FE',
    ground: '#85826E',
    fire: '#FE0808 ',
    water: '#00A3FF',
    grass: '#08FEC3',
    electric: '#FFB800',
    fairy: '#FBA1EC',
    bug:'#9bba48'
    
  };
  return typeColors[type] || '#000'; 
};

</script>