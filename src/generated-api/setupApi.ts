import { OpenAPI } from "./core/OpenAPI";

export function configureApiBaseUrl() {
  if (import.meta.env.MODE === "production") {
    OpenAPI.BASE = import.meta.env.VITE_API_BASE_URL || "";
    OpenAPI.CREDENTIALS = "include";
    OpenAPI.WITH_CREDENTIALS = true;
  } else {
    OpenAPI.BASE = "http://localhost:3000";
    OpenAPI.CREDENTIALS = "include";
    OpenAPI.WITH_CREDENTIALS = true;
  }
}
