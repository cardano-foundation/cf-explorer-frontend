import { defaultAxios } from "./axios";

export const signOut = () => defaultAxios.post("auth/sign-out");
export const signIn = (payload: any) => defaultAxios.post("auth/sign-in", payload);
