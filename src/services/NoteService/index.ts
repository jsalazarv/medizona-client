import BaseService from "@/services/BaseService";
import {
  INoteQueryParams,
  INoteRequest,
  INoteResponse,
} from "@/services/NoteService/types";

import {
  INoContentResponse,
  IPaginatedResponse,
  IPlainResponse,
} from "@/services/types";

export default class NoteService extends BaseService {
  getAll(query: INoteQueryParams): IPaginatedResponse<Array<INoteResponse>> {
    return this.client.get("/notes", query);
  }

  find(id: string, params = {}): IPlainResponse<INoteResponse> {
    return this.client.get(`/notes/${id}/`, params);
  }

  create(note: INoteRequest): IPlainResponse<INoteResponse> {
    return this.client.post(`/notes`, note);
  }

  update(note: INoteRequest): IPlainResponse<INoteResponse> {
    return this.client.put(`/notes/${note.id}`, note);
  }

  delete(id: number | null): INoContentResponse {
    return this.client.delete<void>(`/notes/${id}`);
  }
}
