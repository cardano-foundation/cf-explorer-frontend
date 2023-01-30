import { authAxios } from "./axios";

//user
export const signOut = (payload: TSignOut) => authAxios.post("auth/sign-out", payload);
export const signIn = (payload: TSignIn) => authAxios.post("auth/sign-in", payload);
export const transferWallet = (payload: TTransferWallet) => authAxios.post("auth/transfers-wallet", payload);
export const refreshToken = (payload: TRefreshToken) => authAxios.get("auth/refresh-token", { params: payload });
//auth
export const editInfo = (payload: TEditUser) => authAxios.put("user/edit", payload);
export const getNonce = (payload: TGetNonce) => authAxios.get("user/get-nonce", { params: payload });
export const existEmail = (payload: TCheckExistEmail) => authAxios.get("user/exist-email", { params: payload });
export const existUserName = (payload: TCheckExistUsername) =>
  authAxios.get("user/exist-username", { params: payload });
//note
export const addPrivateNote = (payload: TAddPrivateNote) => authAxios.post("note/add", payload);
export const editPrivateNote = (payload: TEditPrivateNote) => authAxios.put("note/edit", {}, { params: payload });
export const removePrivateNote = (noteId: number) => authAxios.delete(`note/delete/${noteId}`);
