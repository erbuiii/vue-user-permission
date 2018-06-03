<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar :routes="routes"></v-sidebar>
    <div class="content">
      <transition>
        <router-view name="move" mode="out-in"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import Header from "./Header.vue";
  import Sidebar from "./Sidebar.vue"
  import store from "@/store";

  export default {
    components: {
      Header,
      Sidebar
    },
    computed: {
      routes() {
        return store.getters.routers
      }
    }
  }
</script>

