<template>
  <div v-if="isWalletInstalled">
    <Home></Home>
  </div>
  <div v-else>
    <Install></Install>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import Home from "./components/Home.vue";
import Install from "./components/Install.vue";

export default {
  data() {
    return {
      isWalletInstalled: false,
    };
  },
  created() {
    this.isWalletInstalled = window.ethereum ? true : false;
  },
  components: { Home, Install }
}
</script>