import jsonServerProvider from "ra-data-json-server";
import { DataProvider, UpdateManyParams, UpdateParams } from "react-admin";

const API_URL = import.meta.env.VITE_JSON_SERVER_URL;

const baseDataProvider = jsonServerProvider(API_URL);

function headers() {
  return new Headers({
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("accessToken") || "",
  });
}

export const eventProvider: DataProvider = {
  ...baseDataProvider,
  create: async function (
    resource: string,
    params: { data: Record<string, unknown> },
  ) {
    const response = await fetch(`${API_URL}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error(`Create failed (${response.status})`);
    }
    const json = await response.json();
    return { data: json };
  },
  update: async function (resource: string, params: UpdateParams) {
    const response = await fetch(`${API_URL}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: headers(),
    });
    if (!response.ok) {
      throw new Error(`Update failed (${response.status})`);
    }
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
      const { data } = await response.json();
      modifiedId.push(data["id"]);
    });
    return { data: modifiedId };
  },
  delete: async function (resource: string, params: DeleteParams<RecordType>) {
    const id = params.id;
    await fetch(`${API_URL}/${resource}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });
    return { data: params.previousData };
  },
};
