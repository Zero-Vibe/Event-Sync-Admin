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

export const questionProvider: DataProvider = {
  ...baseDataProvider,
  getList: async function (
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ) {
    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = start + perPage;

    const eventId = params.meta?.eventId;
    const sessionId = params.meta?.sessionId;
    if (!eventId || !sessionId) return { data: [], total: 0 };

    const { field, order } = params.sort;
    const hasFilter = params.filter && Object.keys(params.filter).length > 0;

    const response = await fetchUtils.fetchJson(
      `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}${hasFilter ? "&filter=" + encodeURIComponent(JSON.stringify(params.filter)) : ""}`,
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
    const sessionId = params.meta?.sessionId;
    if (!eventId || !sessionId) return { data: undefined };

    const response = await fetch(
      `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}/${id}`,
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
    const sessionId = params.meta?.sessionId;
    if (!eventId || !sessionId) return { data: [] };

    const response = await fetch(
      `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}?${ids.map((id) => "id=" + id).join("&")}`,
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
    const sessionId = params.meta?.sessionId;
    if (!eventId || !sessionId) return { data: [], total: 0 };

    const response = await fetchUtils.fetchJson(
      `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}/${id}/${target}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}`,
    );
    return {
      data: response.json,
      total: parseInt(response.headers.get("X-Total-Count") || "", 10),
    };
  },
  update: async function (resource: string, params: UpdateParams) {
    const id = params.id;
    const eventId = params.meta?.eventId || params.previousData?.eventId;
    const sessionId = params.meta?.sessionId || params.previousData?.sessionId;
    if (!eventId || !sessionId)
      throw new Error(
        "meta.eventId and meta.sessionId are required for questions",
      );

    const response = await fetch(
      `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}/${id}`,
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
    const eventId = params.meta?.eventId;
    const sessionId = params.meta?.sessionId;
    if (!eventId || !sessionId)
      throw new Error(
        "meta.eventId and meta.sessionId are required for questions",
      );

    const ids = params.ids;
    const modifiedId: string[] = [];
    ids.forEach(async (id) => {
      const response = await fetch(
        `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}/${id}`,
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
    const sessionId = params.meta?.sessionId || params.data?.sessionId;
    if (!eventId || !sessionId)
      throw new Error(
        "meta.eventId and meta.sessionId are required for questions",
      );

    const response = await fetch(
      `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}`,
      {
        method: "POST",
        body: JSON.stringify(params.data),
        headers: { "Content-Type": "application/json", ...headers() },
      },
    );
    if (!response.ok) {
      throw new Error(`Create failed (${response.status})`);
    }
    const json = await response.json();
    return { data: json };
  },
  delete: async function (resource: string, params: DeleteParams<RecordType>) {
    const id = params.id;
    const eventId = params.meta?.eventId || params.previousData?.eventId;
    const sessionId = params.meta?.sessionId || params.previousData?.sessionId;
    if (!eventId || !sessionId)
      throw new Error(
        "meta.eventId and meta.sessionId are required for questions",
      );

    const response = await fetch(
      `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}/${id}`,
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
    const eventId = params.meta?.eventId;
    const sessionId = params.meta?.sessionId;
    if (!eventId || !sessionId)
      throw new Error(
        "meta.eventId and meta.sessionId are required for questions",
      );

    const ids = params.ids;
    ids.forEach(async (id) => {
      await fetch(
        `${API_URL}/events/${eventId}/sessions/${sessionId}/${resource}/${id}`,
        {
          method: "DELETE",
          headers: headers(),
        },
      );
    });
    return { data: params.ids };
  },
};
