import { IQueryParams } from "@/services/types";

export interface INoteResponse {
  id: number | null;
  customer: string;
  date: string;
  total: number;
}

export type INoteQueryParams = IQueryParams;
