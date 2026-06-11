import { AuthProvider, QueryFunctionContext } from "react-admin";

const AUTH_API_URL = import.meta.env.VITE_JSON_SERVER_URL + "/auth";

export const authProvider: AuthProvider = {
  login: async function ({
    username,
    password,
  }): Promise<{ redirectTo?: string | boolean } | void | any> {
    await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ email: username, password }),
    })
      .then(async (res) => {
        if (res.status == 200) {
          const data = await res.json();
          localStorage.setItem("accessToken", data?.["accessToken"]);
        } else throw new Error("Failed to login");
      })
      .catch(() => {
        throw new Error("Failed to send request");
      });
  },
  logout: function (params: any): Promise<void | false | string> {
    localStorage.removeItem("accessToken");
    return Promise.resolve("/login");
  },
  checkAuth: async function (
    params: any & QueryFunctionContext,
  ): Promise<void> {
    await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken") || "",
      }),
    })
      .then(async (res) => {
        if (res.status == 200) {
          return;
        } else {
          localStorage.removeItem("accessToken");
          throw new Error("Invalid token");
        }
      })
      .catch(() => {
        throw new Error("Failed to check token status");
      });
  },
  checkError: async function (error: any): Promise<void> {
    const status = error.status;
    if (status == 401 || status == 403) {
      localStorage.removeItem("accessToken");
      throw new Error("Invalid token");
    }
  },
};
