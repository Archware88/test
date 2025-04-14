import { API_URL } from "./constants";

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body: unknown = null,
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    // Get the Bearer token from local storage
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Do NOT set Content-Type manually for FormData (browser handles it)
    const isFormData = body instanceof FormData;
    if (!isFormData) {
      headers["Content-Type"] = "application/x-www-form-urlencoded";
    }

    const options: RequestInit = {
      method,
      headers: isFormData ? headers : { ...headers }, // Avoid modifying headers for FormData
      body: isFormData
        ? body
        : body
        ? new URLSearchParams(body as Record<string, string>).toString()
        : null, // FormData is used directly, others are URL-encoded
    };

    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return response.json() as Promise<T>;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

// Export API methods
const get = <T>(endpoint: string, headers?: Record<string, string>) =>
  apiRequest<T>(endpoint, "GET", null, headers || {});

const post = <T>(
  endpoint: string,
  body: unknown = null,
  headers?: Record<string, string>
) => apiRequest<T>(endpoint, "POST", body, headers || {});

const put = <T>(
  endpoint: string,
  body: unknown = null,
  headers?: Record<string, string>
) => apiRequest<T>(endpoint, "PUT", body, headers || {});

const del = <T>(endpoint: string, headers?: Record<string, string>) =>
  apiRequest<T>(endpoint, "DELETE", null, headers || {});

const patch = <T>(
  endpoint: string,
  body: unknown = null,
  headers?: Record<string, string>
) => apiRequest<T>(endpoint, "PATCH", body, headers || {});

export { get, post, put, del, patch };
