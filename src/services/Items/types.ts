import { IQueryParams } from "@/services/types";

export interface IItemResponse {
  id: number;
  name: string;
  sku: string;
  price: number;
}

export type IItemQueryParams = IQueryParams;
