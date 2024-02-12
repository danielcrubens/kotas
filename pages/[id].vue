<template>
  <div class="flex flex-col items-center py-5  rounded-xl shadow-lg hover:shadow-xl bg-white md:w-6/12 m-auto" v-if="pokemon">
    <img class="w-28 h-28" :src="pokemon.image" :alt="pokemon.name" />
    <h2 class="font-bold -mt-1">{{ pokemon.name }}</h2>
    <div class="mt-8  px-1 gap-2 flex justify-evenly items-center">
        <div v-for="type in pokemon.types" :key="type">
          <TypeColorPicker :type="type" />
        </div>
      </div>
  </div>

  <div v-else>
  <Loading/>
  </div>

  <div class="flex flex-col items-center py-5  mt-8 rounded-xl shadow-lg hover:shadow-xl bg-white md:w-6/12 m-auto" v-if="pokemon && pokemon.abilities">
    <h2 class="font-bold text-xl">Habilidades</h2>
    <Abilities :abilities="pokemon.abilities" />

  </div>
  <div class="flex justify-center items-center mt-5">
  <Nuxt-Link class="text-blue-400 font-medium" to="/">Voltar</Nuxt-Link>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const pokemonId = ref(null);
const pokemon = ref(null);

onMounted(async () => {
  pokemonId.value = router.currentRoute.value.params.id;
  if (pokemonId.value) {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId.value}`);
      const data = await response.json();
      pokemon.value = {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        types: data.types.map((type) => type.type.name),
        abilities: data.abilities ? data.abilities.map((ability) => ability.ability.name) : [] // Verifica se abilities existe
      };
    } catch (error) {
      console.error('Erro ao buscar detalhes do Pokémon:', error);
    }
  }
});
</script>
<style scoped>
.loading-background {
  background-color: rgba(0, 0, 0, 0.5); /* Cor preta com opacidade de 50% */
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px); /* Aplica um desfoque (blur) ao fundo */
}
</style>