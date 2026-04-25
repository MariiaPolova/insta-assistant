import { getSession, signOut } from "next-auth/react";
import { AuthSession } from "../../app/interfaces/common";

async function fetcher(url: string) {
  try {
    const session = await getSession();
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Add authentication token if user is logged in
    if (session?.user) {
      // Get the JWT token from NextAuth session
      const token = (session as AuthSession).id_token;
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const res = await fetch(url, { headers });
    
    if (!res.ok) {

      if(res.status === 401) {
        signOut({ callbackUrl: "/auth/signin" });
      }

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

const API_URL = process.env.API_URL;
export { API_URL };

export default fetcher;