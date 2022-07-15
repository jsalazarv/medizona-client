<template>
  <div>
    <div class="sm:px-6 lg:px-8 text-right">
      <button class="button-primary" @click="redirectToCreation">
        Agregar
      </button>
    </div>

    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden">
        <table class="table">
          <thead class="thead">
            <tr class="border-b border-gray">
              <th
                v-for="header in headers"
                :key="header.text"
                scope="col"
                class="border-gray border-b-2 border-t-2 border-gray-700 py-3 px-3 text-left text-xs text-gray-600 uppercase tracking-wider"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id" class="">
              <td class="py-4 px-6 border-b border-gray-700 text-sm">
                <span>{{ item.id }}</span>
              </td>
              <td class="py-4 px-6 border-b border-gray-700 text-sm">
                <span>{{ item.customer.name }}</span>
              </td>
              <td class="py-4 px-6 border-b border-gray-700 text-sm">
                <span>{{ item.date }}</span>
              </td>
              <td class="py-4 px-6 border-b border-gray-700 text-sm">
                <span>$ {{ item.total }}</span>
              </td>
              <td class="border-b border-gray-700 text-sm flex">
                <div class="flex align-middle">
                  <button
                    class="mx-1 my-3 inline-block p-2 text-center text-white transition bg-green-400 rounded-full shadow ripple hover:shadow-lg hover:bg-green-500 focus:outline-none"
                    @click="redirectToEdition(item.id)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteDialog(item.id)"
                    class="mx-1 my-3 inline-block p-2 text-center text-white transition bg-red-400 rounded-full shadow ripple hover:shadow-lg hover:bg-red-500 focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"
                      />
                    </svg>
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

  updateListAfterDelete(): void {
    const index = this.list.findIndex((item) => item.id === this.itemID);
    this.list.splice(index, 1);
  }

  redirectToCreation(): void {
    this.$router.push({
      name: "notes:create",
    });
  }

  redirectToEdition(id: string): void {
    this.$router.push({
      name: "notes:edit",
      params: { id: id },
    });
  }
}
</script>

<style scoped lang="scss">
@import "styles.css";
</style>
