import jsonServerProvider from "ra-data-json-server";
import {
  CreateParams,
  DataProvider,
  DeleteManyParams,
  DeleteParams,
  fetchUtils,
  GetListParams,
  GetManyParams,
  GetManyReferenceParams,
  GetOneParams,
  QueryFunctionContext,
  UpdateManyParams,
  UpdateParams,
} from "react-admin";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;

const baseDataProvider = jsonServerProvider(API_URL);

export const sessionProvider: DataProvider = {
  ...baseDataProvider,
  getList: async function (
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ) {
    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const { eventId } = params.meta;

    const { field, order } = params.sort;
    const filter = params.filter;

    const response = await fetchUtils.fetchJson(
      `${API_URL}/events/${eventId}/${resource}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}${filter ? "&filter=" + filter : null}`,
    );
    return {
      data: response.json,
      total: parseInt(response.headers.get("X-Total-Count") || "", 10),
    };
  },
  getOne: async function (
    resource: string,
    params: GetOneParams<RecordType> & QueryFunctionContext,
  ) {
    const id = params.id;
    const { eventId } = params.meta;
    const response = await fetch(
      `${API_URL}/events/${eventId}/${resource}/${id}`,
    );
    const { data } = await response.json();
    return data;
  },
  getMany: async function (
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ) {
    const ids = params.ids;
    const { eventId } = params.meta;
    const response = await fetch(
      `${API_URL}/events/${eventId}/${resource}?${ids.map((id) => "id=" + id).join("&")}`,
    );
    const { data } = await response.json();
    return data;
  },
  getManyReference: async function (
    resource: string,
    params: GetManyReferenceParams & QueryFunctionContext,
  ) {
    const target = params.target;
    const id = params.id;

    const { page, perPage } = params.pagination;
    const start = page / perPage;
    const end = start + perPage;
    const { field, order } = params.sort;

    const { eventId } = params.meta;

    const response = await fetchUtils.fetchJson(
      `${API_URL}/events/${eventId}/${resource}/${id}/${target}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}
      `,
    );
    return {
      data: response.json,
      total: parseInt(response.headers.get("X-Total-Count") || "", 10),
    };
  },
  update: async function (resource: string, params: UpdateParams) {
    const id = params.id;
    const { eventId } = params.meta;
    const response = await fetch(
      `${API_URL}/events/${eventId}/${resource}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(params.data),
      },
    );
    const { data } = await response.json();
    return data;
  },
  updateMany: async function (resource: string, params: UpdateManyParams) {
    const ids = params.ids;
    const { eventId } = params.meta;
    const modifiedId: string[] = [];
    ids.forEach(async (id) => {
      const response = await fetch(
        `${API_URL}/events/${eventId}/${resource}/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(params.data),
        },
      );
      const { data } = await response.json();
      modifiedId.push(data["id"]);
    });
    return { data: modifiedId };
  },
  create: async function (resource: string, params: CreateParams) {
    const { eventId } = params.meta;
    const response = await fetch(`${API_URL}/events/${eventId}/${resource}`, {
      method: "PATCH",
      body: JSON.stringify(params.data),
    });
    const { data } = await response.json();
    return data;
  },
  delete: async function (resource: string, params: DeleteParams<RecordType>) {
    const id = params.id;
    const { eventId } = params.meta;
    await fetch(`${API_URL}/events/${eventId}/${resource}/${id}`, {
      method: "DELETE",
    });
    return { data: params.previousData };
  },
  deleteMany: async function (
    resource: string,
    params: DeleteManyParams<RecordType>,
  ) {
    const ids = params.ids;
    const { eventId } = params.meta;
    ids.forEach(async (id) => {
      await fetch(`${API_URL}/events/${eventId}/${resource}/${id}`, {
        method: "DELETE",
      });
    });
    return { data: params.ids };
  },
};
