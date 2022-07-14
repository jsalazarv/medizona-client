<template>
  <div class="flex justify-center">
    <div class="container w-screen">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden">
          <h1>Create note</h1>
          <ItemPicker />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import ItemPicker from "@/views/notes/components/ItemPicker/ItemPicker.vue";

@Component({
  components: { ItemPicker },
})
export default class CreateNotes extends Vue {}
</script>

<style scoped></style>
