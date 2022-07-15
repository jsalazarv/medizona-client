<template>
  <div class="p-2 pt-10">
    <div class="grid place-items-center">
      <div class="card p-5 space-y-5">
        <CustomerPicker :customer.sync="customer" />
        <ItemPicker :items.sync="items">
          <template v-slot:actions>
            <div class="center-right">
              <button class="button-primary text-xs" @click="saveNote">
                SAVE
              </button>
            </div>
          </template>
        </ItemPicker>
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
