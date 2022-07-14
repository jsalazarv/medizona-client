<template>
  <div class="flex justify-center">
    <div class="container w-screen">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden">
          <div class="grid grid-cols-3">
            <div class="col-span-1">
              <CustomerPicker @onChangeCustomer="customer" />
            </div>
            <div>
              <ItemPicker @onChangeItems="items" />
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
import { ICustomerResponse, IItem } from "@/services/CustomerService/types";
import { INoteRequest } from "@/services/NoteService/types";

@Component({
  components: { CustomerPicker, ItemPicker },
})
export default class CreateNotes extends Vue {
  protected noteService = new NoteService();
  public payload: INoteRequest = {
    customer_id: null,
    date: new Date().toString(),
    items: [],
  };

  customer(customer: ICustomerResponse): void {
    this.payload.customer_id = customer.id;
    this.payload.date = new Date().toString();
  }

  items(items: Array<IItem>): void {
    this.payload.items = items;
  }

  saveNote(): void {
    this.noteService
      .create(this.payload)
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
