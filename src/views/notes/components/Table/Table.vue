<template>
  <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
    <div class="shadow overflow-hidden sm:rounded-lg">
      <table class="w-full leading-normal">
        <thead
          class="text-gray-600 text-xs border-gray tracking-wider text-left px-5 py-3 bg-gray-100 hover:cursor-pointer uppercase border-b-2 border-gray-200"
        >
          <tr class="border-b border-gray">
            <th
              v-for="header in headers"
              :key="header.value"
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
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Table extends Vue {
  @Prop()
  headers = [];

  @Prop()
  list = [];

  createNote($id: number): void {
    console.log($id);
  }
}
</script>

<style scoped></style>
