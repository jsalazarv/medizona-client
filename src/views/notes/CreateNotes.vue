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
