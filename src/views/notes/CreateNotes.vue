<template>
  <div class="flex justify-center">
    <div class="container w-screen">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden">
          <h1>Create note</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class CreateNotes extends Vue {}
</script>

<style scoped></style>
