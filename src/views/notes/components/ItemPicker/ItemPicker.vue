<template>
  <div class="container">
    <div class="col-end-12">
      <button type="submit" @click="addRow">Add Item</button>
      <div
        class="grid grid-flow-col auto-cols-max"
        v-for="row in rows"
        :key="row.name"
      >
        <div class="grid grid-cols-12 gap-2">
          <div class="col-span-3">
            <select v-model="row.price">
              <option
                v-for="(item, index) in items"
                :key="index"
                :value="item.price"
              >
                {{ item.name }}
              </option>
            </select>
          </div>
          <div class="col-span-3">
            <input
              type="text"
              placeholder="Price"
              v-model="row.price"
              readonly
            />
          </div>
          <div class="col-span-3">
            <input
              type="number"
              placeholder="Quantity"
              v-model="row.quantity"
              min="1"
            />
          </div>
          <div class="col-span-3">
            <button v-if="rows.length >= 1" @click="deleteRow(row)">X</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ItemService from "@/services/Items";
import { IMeta } from "@/services/types";
import { INoteQueryParams } from "@/services/NoteService/types";
import { IItemResponse } from "@/services/Items/types";

@Component({})
export default class ItemPicker extends Vue {
  public itemService = new ItemService();
  public rows = [
    {
      select: 0,
      price: 0,
      quantity: 1,
    },
  ];

  public items: Array<IItemResponse> = [];

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

  getItemList(filters = {}): void {
    this.itemService
      .getAll(filters)
      .then((response) => {
        this.items = response.data;
      })
      .catch()
      .finally();
  }

  searchItems(): void {
    this.getItemList(this.filters);
  }

  addRow(): void {
    this.rows.push({
      select: 1,
      price: 0,
      quantity: 1,
    });
  }

  deleteRow(index: number): void {
    this.rows.splice(index, 1);
  }

  mounted(): void {
    this.searchItems();
  }
}
</script>

<style scoped></style>
