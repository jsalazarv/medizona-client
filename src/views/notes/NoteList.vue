<template>
  <div class="flex justify-center">
    <div class="container w-screen">
      <div>
        <div>
          <Table :headers="headers" :list="noteList" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NoteService from "@/services/NoteService";
import { IHeaders, IMeta } from "@/services/types";
import { INoteQueryParams, INoteResponse } from "@/services/NoteService/types";
import Table from "@/views/notes/components/Table/Table.vue";

@Component({
  components: { Table },
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

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
