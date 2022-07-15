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
        <div>
          <router-link to="/">Home</router-link> |
          <router-link to="/notes">Notes</router-link>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss"></style>
