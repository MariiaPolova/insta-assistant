import { getSession } from "next-auth/react";

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

/**
 * Fetch wrapper that automatically adds authentication token
 */
export async function authenticatedFetch(
  url: string,
  options: RequestOptions = {}
): Promise<Response> {
  const session = await getSession();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Add authentication token if user is logged in
  if (session?.user) {
    // NextAuth session token - you may need to adjust based on your setup
    const token = (session as any).accessToken || session.user.id;
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers,
  });
}

/**
 * GET request with authentication
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await authenticatedFetch(`${apiUrl}${endpoint}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

/**
 * POST request with authentication
 */
export async function apiPost<T>(endpoint: string, data?: any): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await authenticatedFetch(`${apiUrl}${endpoint}`, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

/**
 * PUT request with authentication
 */
export async function apiPut<T>(endpoint: string, data?: any): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await authenticatedFetch(`${apiUrl}${endpoint}`, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}

/**
 * DELETE request with authentication
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const response = await authenticatedFetch(`${apiUrl}${endpoint}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || "Request failed");
  }

  return response.json();
}
