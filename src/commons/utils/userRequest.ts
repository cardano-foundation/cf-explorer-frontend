import { authAxios } from "./axios";

//user
export const signOut = () => authAxios.post("auth/sign-out");
export const signIn = (payload: any) => authAxios.post("auth/sign-in", payload);
export const transferWallet = (payload: any) => authAxios.post("auth/transfers-wallet", payload);
export const refreshToken = (payload: any) => authAxios.get("auth/refresh-token", { params: payload });
//auth
export const editInfo = (payload: any) => authAxios.put("user/edit", payload);
export const getNonce = (payload: any) => authAxios.get("user/get-nonce", { params: payload });
export const existEmail = (payload: any) => authAxios.get("user/exist-email", { params: payload });
export const existUserName = (payload: any) => authAxios.get("user/exist-username", { params: payload });
