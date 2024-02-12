import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'main',
  state: () => ({
    selectedPokemonId: null,
  }),
  actions: {
    setSelectedPokemonId(id ) {
      this.selectedPokemonId = id;
    },
  },
});
