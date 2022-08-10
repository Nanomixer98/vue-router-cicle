<template>
  <a
    v-if="isExternalLink"
    class="normal-link"
    target="_blank"
    :href="link.to"
    rel="noopener"
  >
    {{ link.name }}
  </a>

  <router-link v-else :to="route" v-slot="{ isActive }">
    <!-- href, isActive -->
    <a :class="isActive ? 'is-active' : 'normal-link'">{{
      link.name
    }}</a></router-link
  >
</template>

<script>
export default {
  props: {
    link: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isExternalLink() {
      return this.link.to.startsWith("http");
    },
    route() {
      return this.link.id === undefined
        ? { name: this.link.to }
        : { name: this.link.to, params: { id: this.link.id } };
    },
  },
};
</script>

<style scoped>
.is-active {
  color: #42b983;
}
.normal-link {
  color: #c7c5c5;
}
</style>
