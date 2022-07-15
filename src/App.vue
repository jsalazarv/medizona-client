<template>
  <div id="app">
    <nav id="nav" class="navbar shadow-md sticky top-0 z-50">
      <div
        class="container flex flex-wrap justify-between items-center mx-auto"
      >
        <a href="/" class="flex items-center">
          <img
            src="https://medizona.com.mx/images/logo-medizona-2-svg-white.svg"
            class="mr-3 h-6 sm:h-14"
            alt="medizona"
          />
        </a>
        <div v-if="isAuthenticated">
          <router-link to="/">Home</router-link> |
          <router-link to="/notes">Notes</router-link> |
          <a @click="logout">Logout</a>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AuthService from "@/services/AuthService";

@Component({})
export default class App extends Vue {
  protected authService = new AuthService();

  get isAuthenticated(): boolean {
    return this.$store.getters["auth/authenticated"];
  }

  logout(): void {
    this.authService
      .logout()
      .then(() => {
        this.$store.dispatch("auth/resetAccess");
        this.$router.push({ name: "login" });
      })
      .catch()
      .finally();
  }
}
</script>

<style lang="scss"></style>
