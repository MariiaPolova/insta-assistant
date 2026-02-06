import { Session } from "next-auth";

export interface AuthSession extends Session {
    id_token?: string;
}