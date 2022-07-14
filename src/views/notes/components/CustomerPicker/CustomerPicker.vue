<template>
  <div class="container">
    <div class="grid grid-cols-1">
      <div class="">
        <select v-model="customerIndexSelected">
          <option></option>
          <option
            v-for="(customer, index) in customerList"
            :key="index"
            :value="index"
          >
            {{ customer.name }}
          </option>
        </select>
        <div>
          <span>{{ customerSelected.name }}</span>
          <span>{{ customerSelected.address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import CustomerService from "@/services/CustomerService";
import { IMeta } from "@/services/types";
import { INoteQueryParams } from "@/services/NoteService/types";
import { ICustomerResponse } from "@/services/CustomerService/types";

@Component({})
export default class CustomerPicker extends Vue {
  protected customerService = new CustomerService();
  public customerList: Array<ICustomerResponse> = [];
  public customerIndexSelected: number | null = null;
  public customerSelected: ICustomerResponse = {
    id: null,
    name: "",
    address: "",
  };
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

  getCustomerList(filters = {}): void {
    this.customerService
      .getAll(filters)
      .then((response) => {
        console.log(response);
        this.customerList = response.data;
      })
      .catch()
      .finally();
  }

  searchItems(): void {
    this.getCustomerList(this.filters);
  }

  @Watch("customerIndexSelected")
  selectedCustomer(current: number): ICustomerResponse | undefined {
    const currentCustomer = this.customerList[current];

    if (currentCustomer) {
      return (this.customerSelected = currentCustomer);
    }

    this.customerSelected = {
      id: null,
      name: "",
      address: "",
    };
  }

  mounted(): void {
    this.searchItems();
  }
}
</script>

<style scoped></style>
