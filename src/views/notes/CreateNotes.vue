<template>
  <div>
    Crear notas
    <Dialog />
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import Dialog from "@/views/notes/components/Dialog/Dialog.vue";
@Component({
  components: { Dialog },
})
export default class CreateNotes extends Vue {}
</script>

<style scoped></style>
