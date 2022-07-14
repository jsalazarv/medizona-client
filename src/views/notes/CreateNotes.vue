<template>
  <div class="flex justify-center">
    <div class="container w-screen">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden">
          <div class="grid grid-cols-2">
            <CustomerPicker @onChangeCustomer="customer" />
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
import NoteService from "@/services/NoteService";
import ItemPicker from "@/views/notes/components/ItemPicker/ItemPicker.vue";
import CustomerPicker from "@/views/notes/components/CustomerPicker/CustomerPicker.vue";
import {
  ICustomerRequest,
  ICustomerResponse,
} from "@/services/CustomerService/types";

@Component({
  components: { CustomerPicker, ItemPicker },
})
export default class CreateNotes extends Vue {
  protected noteService = new NoteService();
  public payload: ICustomerRequest = {
    customer_id: null,
    date: new Date(),
  };

  customer(customer: ICustomerResponse): void {
    this.payload.customer_id = customer.id;
    this.payload.date = new Date();
  }

  /*date(date: string): void {
    this.payload.date = date;
    console.log(date);
  }*/
}
</script>

<style scoped></style>
