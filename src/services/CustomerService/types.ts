import { IQueryParams } from "@/services/types";

export interface ICustomerResponse {
  id: number | null;
  name: string;
  address: string;
}

export interface IItem {
  id: number;
  quantity: number;
}

export interface ICustomerRequest {
  customer_id: number | null;
  date: Date;
  items: Array<IItem>;
}

export type ICustomerQueryParams = IQueryParams;
