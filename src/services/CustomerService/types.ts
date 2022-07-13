import { IQueryParams } from "@/services/types";

export interface ICustomerResponse {
  id: number | null;
  name: string;
  address: string;
}

export type ICustomerQueryParams = IQueryParams;
