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
              <ItemPicker :items.sync="items" />
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
import CustomerPicker from "@/views/notes/components/CustomerPicker/CustomerPicker.vue";
import ItemPicker from "@/views/notes/components/ItemPicker/ItemPicker.vue";
import { IItem, INoteRequest } from "@/services/NoteService/types";
import { ICustomerResponse } from "@/services/CustomerService/types";

@Component({
  components: { ItemPicker, CustomerPicker },
})
export default class EditNotes extends Vue {
  protected noteService = new NoteService();
  public items: Array<IItem> = [];
  public customer: ICustomerResponse = {
    id: null,
    name: "",
    address: "",
  };

  getNoteInfo(): void {
    this.noteService
      .find(this.$route.params.id)
      .then((response) => {
        this.customer = response.data.customer;
        this.items = response.data.items as Array<IItem>;
      })
      .catch()
      .finally();
  }

  saveNote(): void {
    const payload: INoteRequest = {
      id: Number(this.$route.params.id),
      customer_id: this.customer.id,
      date: new Date().toString(),
      items: this.items,
    };
    this.noteService
      .update(payload)
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

  mounted(): void {
    this.getNoteInfo();
  }
}
</script>

<style scoped></style>
