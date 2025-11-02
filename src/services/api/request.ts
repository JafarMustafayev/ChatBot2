import type { ResponseType } from "../../interfaces/Response";

async function request<T>(
  url: string,
  method: string = "GET",
  data?: any
): Promise<ResponseType<T>> {
  return new Promise(async (resolve, reject) => {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };
    if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
      options.body = JSON.stringify(data);
    }

    const completedUrl = import.meta.env.VITE_BASE_API_URL + url;
    const response = await fetch(completedUrl, options);
    const responseData: ResponseType = await response.json();

    if (response.ok) {
      resolve(responseData);
    } else {
      reject(responseData);
    }
  });
}

// Simplified request functions
export const get = <T>(url: string) => request<T>(url, "GET");

export const post = <T>(url: string, data: any) =>
  request<T>(url, "POST", data);

export const patch = <T>(url: string, data?: any) =>
  request<T>(url, "PATCH", data);

export const put = <T>(url: string, data?: any) => request<T>(url, "PUT", data);

export const del = <T>(url: string, data?: any) =>
  request<T>(url, "DELETE", data);
