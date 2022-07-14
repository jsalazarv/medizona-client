import { IQueryParams } from "@/services/types";

export interface IItemResponse {
  id: number;
  sku: string;
  price: number;
}

export type IItemQueryParams = IQueryParams;
