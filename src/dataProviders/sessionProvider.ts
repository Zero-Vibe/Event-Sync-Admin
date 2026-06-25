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

function headers() {
  return new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken") || "",
  });
}

export const sessionProvider: DataProvider = {
  ...baseDataProvider,
  getList: async function (
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ) {
    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const eventId = params.meta?.eventId;
    if (!eventId) return { data: [], total: 0 };

    const { field, order } = params.sort;
    const hasFilter = params.filter && Object.keys(params.filter).length > 0;

    const response = await fetchUtils.fetchJson(
      `${API_URL}/events/${eventId}/${resource}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}${hasFilter ? "&filter=" + JSON.stringify(params.filter) : ""}`,
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
    const eventId = params.meta?.eventId;
    if (!eventId) return { data: undefined };

    const response = await fetch(
      `${API_URL}/events/${eventId}/${resource}/${id}`,
      { headers: headers() },
    );
    const json = await response.json();
    return { data: json };
  },
  getMany: async function (
    resource: string,
    params: GetManyParams<RecordType> & QueryFunctionContext,
  ) {
    const ids = params.ids;
    const eventId = params.meta?.eventId;
    if (!eventId) return { data: [] };

    const response = await fetch(
      `${API_URL}/events/${eventId}/${resource}?${ids.map((id) => "id=" + id).join("&")}`,
      { headers: headers() },
    );
    const json = await response.json();
    return { data: json };
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

    const eventId = params.meta?.eventId;
    if (!eventId) return { data: [], total: 0 };

    const response = await fetchUtils.fetchJson(
      `${API_URL}/events/${eventId}/${resource}/${id}/${target}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}`,
    );
    return {
      data: response.json,
      total: parseInt(response.headers.get("X-Total-Count") || "", 10),
    };
  },
  update: async function (resource: string, params: UpdateParams) {
    const id = params.id;
    const eventId =
      params.meta?.eventId ||
      params.previousData?.eventId ||
      params.previousData?.event?.id;
    if (!eventId) throw new Error("meta.eventId is required for sessions");

    const response = await fetch(
      `${API_URL}/events/${eventId}/${resource}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(params.data),
        headers: { "Content-Type": "application/json", ...headers() },
      },
    );
    if (!response.ok) {
      throw new Error(`Update failed (${response.status})`);
    }
    const json = await response.json();
    return { data: json };
  },
  updateMany: async function (resource: string, params: UpdateManyParams) {
    const ids = params.ids;
    const eventId = params.meta?.eventId;
    if (!eventId) throw new Error("meta.eventId is required for sessions");

    const modifiedId: string[] = [];
    ids.forEach(async (id) => {
      const response = await fetch(
        `${API_URL}/events/${eventId}/${resource}/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(params.data),
          headers: { "Content-Type": "application/json", ...headers() },
        },
      );
      const json = await response.json();
      modifiedId.push(json["id"]);
    });
    return { data: modifiedId };
  },
  create: async function (resource: string, params: CreateParams) {
    const eventId = params.meta?.eventId || params.data?.eventId;
    if (!eventId) throw new Error("meta.eventId is required for sessions");

    const response = await fetch(`${API_URL}/events/${eventId}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: { "Content-Type": "application/json", ...headers() },
    });
    if (!response.ok) {
      throw new Error(`Create failed (${response.status})`);
    }
    const json = await response.json();
    return { data: json };
  },
  delete: async function (resource: string, params: DeleteParams<RecordType>) {
    const id = params.id;
    const eventId =
      params.meta?.eventId ||
      params.previousData?.eventId ||
      params.previousData?.event?.id;
    if (!eventId) throw new Error("meta.eventId is required for sessions");

    const response = await fetch(
      `${API_URL}/events/${eventId}/${resource}/${id}`,
      {
        method: "DELETE",
        headers: headers(),
      },
    );
    if (!response.ok) {
      throw new Error(`Delete failed (${response.status})`);
    }
    return { data: params.previousData };
  },
  deleteMany: async function (
    resource: string,
    params: DeleteManyParams<RecordType>,
  ) {
    const ids = params.ids;
    const eventId = params.meta?.eventId;
    if (!eventId) throw new Error("meta.eventId is required for sessions");

    ids.forEach(async (id) => {
      await fetch(`${API_URL}/events/${eventId}/${resource}/${id}`, {
        method: "DELETE",
        headers: headers(),
      });
    });
    return { data: params.ids };
  },
};
