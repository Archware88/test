import { API_URL } from "./constants";

// Generic API request function
const apiRequest = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  body: unknown = null,
  headers: Record<string, string> = {}
): Promise<T> => {
  try {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const isFormData = body instanceof FormData;
    const options: RequestInit = {
      method,
      headers: {
        ...headers,
        // Only set Content-Type if not FormData
        ...(!isFormData && {
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      },
      body: isFormData
        ? body
        : body
        ? new URLSearchParams(body as Record<string, string>).toString()
        : null,
    };

    const response = await fetch(`${API_URL}${endpoint}`, options);

    // Try to parse response as JSON (works for both success and error responses)
    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      // Throw an error with the full response data
      throw {
        status: response.status,
        data: responseData,
        message:
          responseData.message || `HTTP error! status: ${response.status}`,
        isApiError: true,
      };
    }

    return responseData as T;
  } catch (error: unknown) {
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
