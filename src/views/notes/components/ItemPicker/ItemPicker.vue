<template>
  <div>
    <button class="button-success" type="submit" @click="addRow">ADD</button>

    <table class="table w-full">
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th class="text-right">Price</th>
          <th class="text-right">Subtotal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, indexRow) in rows" :key="indexRow">
          <td class="p-1">
            <select v-model="rows[indexRow]">
              <option :value="row">{{ row.name }}</option>
              <option
                v-for="(item, index) in itemsList"
                :key="index"
                :value="item"
              >
                {{ item.name }}
              </option>
            </select>
          </td>
          <td class="p-1 w-20">
            <input
              type="number"
              placeholder="Quantity"
              v-model="row.quantity"
              min="1"
            />
          </td>
          <td class="p-1 w-20 text-right">
            <span>${{ row.price }}</span>
          </td>
          <td class="p-1 w-20 text-right">
            <span>${{ row.price * row.quantity }}</span>
          </td>
          <td class="p-1 w-20 text-right">
            <button
              class="button-danger text-xs"
              v-if="rows.length >= 1"
              @click="deleteRow(indexRow)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
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
          </td>
        </tr>
        <tr>
          <td class="text-right" colspan="4">
            <h2>Total: ${{ total }}</h2>
          </td>
          <td>
            <slot name="actions"></slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from "vue-property-decorator";
import ItemService from "@/services/Items";
import { IMeta } from "@/services/types";
import { IItem, INoteQueryParams } from "@/services/NoteService/types";
import { IItemResponse } from "@/services/Items/types";

@Component({})
export default class ItemPicker extends Vue {
  public itemService = new ItemService();

  @PropSync("items", {
    default: () => [],
  })
  public rows!: Array<IItem>;

  public itemsList: Array<IItemResponse> = [];

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
        this.itemsList = response.data.map((item) => ({
          ...item,
          quantity: 1,
        }));
      })
      .catch()
      .finally();
  }

  searchItems(): void {
    this.getItemList(this.filters);
  }

  addRow(): void {
    this.rows.push({
      id: null,
      name: "",
      sku: "",
      price: 0,
      quantity: 1,
    });
  }

  deleteRow(index: number): void {
    this.rows.splice(index, 1);
  }

  get total(): number {
    let total = 0;
    for (const row of this.rows) {
      total += row.price * row.quantity;
    }
    return total;
  }

  created(): void {
    if (!this.rows.length) {
      this.addRow();
    }
  }

  mounted(): void {
    this.searchItems();
  }
}
</script>

<style scoped></style>
