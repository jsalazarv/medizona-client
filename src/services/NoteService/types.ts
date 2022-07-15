import { IQueryParams } from "@/services/types";
import { ICustomerResponse } from "@/services/CustomerService/types";
import { IItemResponse } from "@/services/Items/types";

export interface INoteResponse {
  id: number | null;
  customer_id: number | null;
  customer: ICustomerResponse;
  items: Array<IItemResponse>;
  date: string;
  total: number;
}

export interface IItem {
  id: number | null;
  name: string;
  sku: string;
  price: number;
  quantity: number;
}

export interface INoteRequest {
  id?: number | null;
  customer_id: number | null;
  date: string;
  items: Array<IItem>;
}

export type INoteQueryParams = IQueryParams;
