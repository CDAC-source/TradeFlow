import axios from "axios";
import { notify } from "../utils/notify";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// SUCCESS interceptor
api.interceptors.response.use(
  (response) => {
    if (response.config.method !== "get") {
      notify("Operation successful", "success");
    }
    return response;
  },
  (error) => {
    notify(
      error.response?.data?.message || "Something went wrong",
      "error"
    );
    return Promise.reject(error);
  }
);

export default api;
