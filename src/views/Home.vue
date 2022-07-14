<template>
  <div class="home">Medizona</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoteList from "@/views/notes/NoteList.vue"; // @ is an alias to /src

@Component({
  components: {
    NoteList,
  },
})
export default class Home extends Vue {}
</script>
