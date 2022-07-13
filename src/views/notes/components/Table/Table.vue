<template>
  <table class="min-w-full text-sm text-gray-400">
    <thead class="bg-gray-800 text-xs uppercase font-medium">
      <tr>
        <th
          v-for="header in headers"
          :key="header.value"
          scope="col"
          class="px-6 py-3 text-left tracking-wider"
        >
          {{ header.text }}
        </th>
      </tr>
    </thead>
    <tbody class="bg-gray-800">
      <tr v-for="item in list" :key="item.id" class="bg-black bg-opacity-20">
        <td class="pl-4">{{ item.id }}</td>
        <td class="flex px-6 py-4 whitespace-nowrap">
          {{ item.customer.name }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.date }}</td>
        <td class="px-6 py-4 whitespace-nowrap">$ {{ item.total }}</td>
        <td class="flex px-6 py-4 whitespace-nowrap"></td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Table extends Vue {
  @Prop()
  public headers = [];

  @Prop()
  public list = [];
}
</script>

<style scoped></style>
