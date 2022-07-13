import BaseService from "@/services/BaseService";
import { INoteQueryParams, INoteResponse } from "@/services/NoteService/types";
import { IPaginatedResponse } from "@/services/types";

export default class NoteService extends BaseService {
  getAll(query: INoteQueryParams): IPaginatedResponse<Array<INoteResponse>> {
    return this.client.get("/notes", query);
  }
}
