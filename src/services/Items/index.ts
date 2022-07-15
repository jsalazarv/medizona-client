import BaseService from "@/services/BaseService";
import { IPaginatedResponse } from "@/services/types";
import { IItemQueryParams, IItemResponse } from "@/services/Items/types";

export default class ItemService extends BaseService {
  getAll(query: IItemQueryParams): IPaginatedResponse<Array<IItemResponse>> {
    return this.client.get("/items", query);
  }
}
