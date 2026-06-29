import jsonServerProvider from "ra-data-json-server";
import {
  DataProvider,
  GetListParams,
  GetOneParams,
  GetManyParams,
  GetManyReferenceParams,
  fetchUtils,
  UpdateManyParams,
  UpdateParams,
  DeleteParams,
  QueryFunctionContext,
} from "react-admin";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;

const baseDataProvider = jsonServerProvider(API_URL);

function headers() {
  return new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("accessToken") || "",
  });
}

async function fetchWithAuth(url: string) {
  const response = await fetch(url, { headers: headers() });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  const json = await response.json();
  return json;
}

export const userProvider: DataProvider = {
  ...baseDataProvider,
  getList: async function (
    resource: string,
    params: GetListParams & QueryFunctionContext,
  ) {
    const { page, perPage } = params.pagination;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const { field, order } = params.sort;
    const hasFilter = params.filter && Object.keys(params.filter).length > 0;

    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}${hasFilter ? "&filter=" + JSON.stringify(params.filter) : ""}`,
      { headers: headers() },
    );
    return {
      data: response.json,
      total: parseInt(response.headers.get("X-Total-Count") || "0", 10),
    };
  },
  getOne: async function (
    resource: string,
    params: GetOneParams & QueryFunctionContext,
  ) {
    const json = await fetchWithAuth(`${API_URL}/${resource}/${params.id}`);
    return { data: json };
  },
  getMany: async function (
    resource: string,
    params: GetManyParams & QueryFunctionContext,
  ) {
    const ids = params.ids;
    const json = await fetchWithAuth(
      `${API_URL}/${resource}?${ids.map((id) => "id=" + id).join("&")}`,
    );
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

    const response = await fetchUtils.fetchJson(
      `${API_URL}/${resource}/${id}/${target}?_start=${start}&_end=${end}&_sort=${field}&_order=${order}`,
      { headers: headers() },
    );
    return {
      data: response.json,
      total: parseInt(response.headers.get("X-Total-Count") || "0", 10),
    };
  },
  create: async function (
    resource: string,
    params: { data: Record<string, unknown> },
  ) {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: headers(),
    });
    if (!response.ok) throw new Error(`Create failed (${response.status})`);
    const json = await response.json();
    return { data: json };
  },
  update: async function (resource: string, params: UpdateParams) {
    const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: headers(),
    });
    if (!response.ok) throw new Error(`Update failed (${response.status})`);
    const json = await response.json();
    return { data: json };
  },
  updateMany: async function (resource: string, params: UpdateManyParams) {
    const ids = params.ids;
    const modifiedId: string[] = [];
    ids.forEach(async (id) => {
      const response = await fetch(`${API_URL}/${resource}/${id}`, {
        method: "PUT",
        body: JSON.stringify(params.data),
        headers: headers(),
      });
      if (!response.ok) throw new Error(`Update failed (${response.status})`);
      const json = await response.json();
      modifiedId.push(json["id"]);
    });
    return { data: modifiedId };
  },
  delete: async function (resource: string, params: DeleteParams) {
    const id = params.id;
    const response = await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    if (!response.ok) throw new Error(`Delete failed (${response.status})`);
    return { data: params.previousData };
  },
};
