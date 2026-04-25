import { getSession } from "next-auth/react";
import { AuthSession } from "../../app/interfaces/common";

type Method = 'POST' | 'PUT' | 'DELETE';

async function requester(method: Method, url: string, body?: any) {
  try {
    const session = await getSession();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authentication token if user is logged in
    if (session?.user) {
      const token = (session as AuthSession).id_token;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const res = await fetch(url, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers,
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || "Request failed");
    }
    
     // Check if the content type is JSON
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      // Handle other content types like plain text if necessary
      return await res.text();
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default requester;