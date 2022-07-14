<template>
  <div class="flex justify-center">
    <div class="container w-screen">
      <div>
        <div>
          <Table :headers="headers" :list="noteList" />
        </div>
      </div>
    </div>
    <button
      class="mx-1 my-3 inline-block p-2 text-center text-white transition bg-blue-700 rounded-full shadow ripple hover:shadow-lg hover:bg-blue-800 focus:outline-none"
      @click="showDialog"
    >
      +
    </button>
    <Dialog :open.sync="openDialog" text-btn-close="Cerrar">
      <template v-slot:body>
        <h1>Formulario</h1>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NoteService from "@/services/NoteService";
import { IHeaders, IMeta } from "@/services/types";
import { INoteQueryParams, INoteResponse } from "@/services/NoteService/types";
import Table from "@/views/notes/components/Table/Table.vue";
import Dialog from "@/views/notes/components/Dialog/Dialog.vue";

@Component({
  components: { Dialog, Table },
})
export default class NoteList extends Vue {
  protected noteService = new NoteService();
  public noteList: Array<INoteResponse> = [];
  public params = {
    query: "",
  };
  public pagination: IMeta = {
    current_page: 1,
    from: 1,
    last_page: 1,
    per_page: 10,
    to: 1,
    total: 0,
  };
  public openDialog = false;

  get filters(): INoteQueryParams {
    return {
      ...this.params,
      page: this.pagination.current_page,
      per_page: this.pagination.per_page,
    };
  }

  search(): void {
    this.getNotesList(this.filters);
  }

  getNotesList(filters = {}): void {
    this.noteService
      .getAll(filters)
      .then((response) => {
        this.noteList = response.data;
      })
      .catch()
      .finally();
  }

  get headers(): Array<IHeaders> {
    return [
      { text: "Id" },
      { text: "Customer" },
      { text: "Date" },
      { text: "Total" },
      { text: "" },
    ];
  }

  showDialog(): void {
    this.openDialog = true;
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
