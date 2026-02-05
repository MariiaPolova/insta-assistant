import { getSession } from "next-auth/react";

async function fetcher(url: string) {
  try {
    const session = await getSession();
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authentication token if user is logged in
    if (session?.user) {
      // Get the JWT token from NextAuth session
      const token = (session as any).accessToken || (session as any).id_token;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const res = await fetch(url, { headers });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ message: res.statusText }));
      throw new Error(error.message || "Request failed");
    }
    
    return res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
}

console.log('process.env API_URL');
console.log(process.env.API_URL);

const API_URL = process.env.API_URL;
export { API_URL };

export default fetcher;