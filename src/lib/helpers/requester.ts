import { getSession } from "next-auth/react";

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function requester(method: Method, url: string, body?: any) {
  try {
    const session = await getSession();
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authentication token if user is logged in
    if (session?.user) {
      const token = (session as any).accessToken || (session as any).id_token;
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
    
    return res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export default requester;