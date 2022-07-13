import BaseService from "@/services/BaseService";
import { IPaginatedResponse } from "@/services/types";
import {
  ICustomerQueryParams,
  ICustomerResponse,
} from "@/services/CustomerService/types";

export default class CustomerService extends BaseService {
  getAll(
    query: ICustomerQueryParams
  ): IPaginatedResponse<Array<ICustomerResponse>> {
    return this.client.get("/customers", query);
  }
}
