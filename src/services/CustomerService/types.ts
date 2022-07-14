import { IQueryParams } from "@/services/types";

export interface ICustomerResponse {
  id: number | null;
  name: string;
  address: string;
}

export interface ICustomerRequest {
  customer_id: number | null;
  date: Date;
}

export type ICustomerQueryParams = IQueryParams;
