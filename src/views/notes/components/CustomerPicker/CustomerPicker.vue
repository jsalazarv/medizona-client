<template>
  <div>
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
    <div
      class="customer-info mt-5 space-y-3"
      style="min-width: 400px; max-width: 700px"
    >
      <p>
        <span class="font-black">Name:</span>
        {{ customerSelected.name }}
      </p>
      <p>
        <span class="font-black">Address:</span>
        {{ customerSelected.address }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, PropSync, Vue, Watch } from "vue-property-decorator";
import CustomerService from "@/services/CustomerService";
import { IMeta } from "@/services/types";
import { INoteQueryParams } from "@/services/NoteService/types";
import { ICustomerResponse } from "@/services/CustomerService/types";

@Component({})
export default class CustomerPicker extends Vue {
  protected customerService = new CustomerService();
  public customerList: Array<ICustomerResponse> = [];
  public customerIndexSelected: number | null = null;

  @PropSync("customer", {
    default: () => ({ id: null, name: "", address: "" }),
  })
  public customerSelected!: ICustomerResponse;

  public date = new Date();
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
        this.customerList = response.data;
      })
      .catch()
      .finally();
  }

  searchItems(): void {
    this.getCustomerList(this.filters);
  }

  @Watch("customerIndexSelected")
  onChangeCustomerIndex(index: number): ICustomerResponse {
    const selectedCustomer = this.customerList[index];

    if (selectedCustomer) {
      return this.setCustomerData(selectedCustomer);
    }

    return this.setCustomerData({
      id: null,
      name: "",
      address: "",
    });
  }

  @Watch("customer")
  onChangeCustomer(customer: ICustomerResponse) {
    const index = this.customerList.findIndex(
      (item) => item.id === customer.id
    );

    this.customerIndexSelected = index;
  }

  @Watch("customerList")
  watchCustomerList(list) {
    const index = list.findIndex(
      (item) => item.id === this.customerSelected.id
    );

    this.customerIndexSelected = index;
  }

  @Emit("onChangeCustomer")
  setCustomerData(data: ICustomerResponse): ICustomerResponse {
    return (this.customerSelected = data);
  }

  mounted(): void {
    this.searchItems();
  }
}
</script>

<style scoped></style>
