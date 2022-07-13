<template>
  <div>
    <div class="flex flex-col mt-6">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden sm:rounded-lg">
            <Table :headers="headers" :list="noteList" />
          </div>
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
      {
        text: "Id",
        value: "id",
        sortable: false,
      },
      {
        text: "Customer",
        value: "name",
        sortable: false,
      },
      {
        text: "Date",
        value: "description",
        sortable: false,
      },
      {
        text: "Total",
        value: "salary",
        sortable: false,
      },
      { text: "", value: "actions", align: "end", sortable: false },
    ];
  }

  mounted(): void {
    this.search();
  }
}
</script>

<style scoped></style>
