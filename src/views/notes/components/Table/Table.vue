<template>
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden">
      <table class="table">
        <thead class="thead">
          <tr class="border-b border-gray">
            <th
              v-for="header in headers"
              :key="header.text"
              scope="col"
              class="text-gray-dark border-gray border-b-2 border-t-2 border-gray-200 py-3 px-3 bg-gray-100 text-left text-xs text-gray-600 uppercase tracking-wider"
            >
              {{ header.text }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in list"
            :key="item.id"
            class="hover:bg-gray-100 hover:cursor-pointer"
          >
            <td
              class="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm"
            >
              <span>{{ item.id }}</span>
            </td>
            <td
              class="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm"
            >
              <span>{{ item.customer.name }}</span>
            </td>
            <td
              class="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm"
            >
              <span>{{ item.date }}</span>
            </td>
            <td
              class="py-4 px-6 border-b border-gray-200 text-gray-900 text-sm"
            >
              <span>$ {{ item.total }}</span>
            </td>
            <td class="border-b border-gray-200 text-gray-900 text-sm flex">
              <div class="flex align-middle">
                <button
                  :data-item-button="item.id"
                  class="mx-1 my-3 inline-block p-2 text-center text-white transition bg-green-400 rounded-full shadow ripple hover:shadow-lg hover:bg-green-500 focus:outline-none"
                  @click="createNote(item.id)"
                >
                  +
                </button>
                <button
                  class="mx-1 my-3 inline-block p-2 text-center text-white transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
                >
                  +
                </button>
                <button
                  @click="deleteDialog(item.id)"
                  class="mx-1 my-3 inline-block p-2 text-center text-white transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
                >
                  +
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Dialog
      :open.sync="openDialog"
      :data="itemID"
      @onDelete="updateListAfterDelete"
      text-btn-close="Cerrar"
    >
      <template v-slot:body>
        <h1>Deseas eliminar esta nota?</h1>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Prop, PropSync, Vue } from "vue-property-decorator";
import Dialog from "@/views/notes/components/Dialog/Dialog.vue";
import { INoteResponse } from "@/services/NoteService/types";
import { IHeaders } from "@/services/types";

@Component({
  components: { Dialog },
})
export default class Table extends Vue {
  @Prop()
  headers!: Array<IHeaders>;

  @PropSync("itemList", { default: () => [] })
  list!: Array<INoteResponse>;

  public openDialog = false;
  public itemID: number | null = null;

  deleteDialog($id: number): void {
    this.openDialog = true;
    this.itemID = $id;
  }

  updateListAfterDelete(id: number): void {
    const index = this.list.findIndex((item) => item.id === id);
    this.list.splice(index, 1);
  }
}
</script>

<style scoped lang="scss">
@import "styles.css";
</style>
