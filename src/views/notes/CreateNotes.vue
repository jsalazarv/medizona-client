<template>
  <div class="flex justify-center">
    <div class="container w-screen">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden">
          <div class="grid grid-cols-3">
            <div class="col-span-1">
              <CustomerPicker :customer.sync="customer" />
            </div>
            <div>
              <ItemPicker @onChangeItems="onChangeItems" />
            </div>
          </div>
          <div>
            <button
              class="modal-default-button mx-2 px-4 rounded-full inline-block p-2 text-white bg-blue-700 shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
              @click="saveNote"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import NoteService from "@/services/NoteService";
import ItemPicker from "@/views/notes/components/ItemPicker/ItemPicker.vue";
import CustomerPicker from "@/views/notes/components/CustomerPicker/CustomerPicker.vue";
import { IItem, INoteRequest } from "@/services/NoteService/types";

@Component({
  components: { CustomerPicker, ItemPicker },
})
export default class CreateNotes extends Vue {
  protected noteService = new NoteService();
  public items: Array<IItem> = [];

  public customer = {
    id: null,
    name: "",
    address: "",
  };

  onChangeItems(items: Array<IItem>): void {
    this.items = items;
  }

  saveNote(): void {
    const payload: INoteRequest = {
      customer_id: this.customer.id,
      date: new Date().toString(),
      items: this.items,
    };
    this.noteService
      .create(payload)
      .then((response) => {
        if (response.data.id) {
          this.$router.push({
            name: "notes:list",
          });
        }
      })
      .catch()
      .finally();
  }
}
</script>

<style scoped></style>
