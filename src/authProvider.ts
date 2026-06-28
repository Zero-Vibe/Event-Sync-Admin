import { AuthProvider } from "react-admin";

const AUTH_API_URL = import.meta.env.VITE_JSON_SERVER_URL + "/auth";

export const authProvider: AuthProvider = {
  login: async function ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
    const res = await fetch(`${AUTH_API_URL}/login`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ email: username, password }),
    });
    if (res.status !== 200) {
      throw new Error("Invalid credentials");
    }
    const data = await res.json();
    localStorage.setItem("accessToken", data?.["access_token"]);
  },
  logout: function () {
    localStorage.removeItem("accessToken");
    return Promise.resolve("/login");
  },
  checkAuth: async function () {
    const res = await fetch(`${AUTH_API_URL}/authStatus`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken") || "",
      }),
    });
    if (!res.ok) {
      localStorage.removeItem("accessToken");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  checkError: function (error: { status?: number }) {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem("accessToken");
      return Promise.reject();
    }
    return Promise.resolve();
  },
};
