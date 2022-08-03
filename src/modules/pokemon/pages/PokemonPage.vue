<template>
  <h1>
    Pokemon: <span>#{{ id }}</span>
  </h1>
  <div v-if="pokemon">
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      // id: this.$route.params.id,
      pokemon: null,
    };
  },
  created() {
    // const { id } = this.$route.params;
    // console.log(id);
    // this.id = id;
    this.getPokemon();
  },
  methods: {
    async getPokemon() {
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        const pokemon = await res.json();
        console.log(pokemon);
        this.pokemon = pokemon;
      } catch (err) {
        this.$router.push("/");
        console.log("Nothing to do here");
      }
    },
  },
  watch: {
    id() {
      this.getPokemon();
    },
  },
};
</script>
