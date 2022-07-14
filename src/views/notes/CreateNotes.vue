<template>
  <div class="flex justify-center">
    <div class="container w-screen">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden">
          <div class="grid grid-cols-2">
            <CustomerPicker />
            <ItemPicker />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import ItemPicker from "@/views/notes/components/ItemPicker/ItemPicker.vue";
import CustomerPicker from "@/views/notes/components/CustomerPicker/CustomerPicker.vue";

@Component({
  components: { CustomerPicker, ItemPicker },
})
export default class CreateNotes extends Vue {}
</script>

<style scoped></style>
