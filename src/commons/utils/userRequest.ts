import { AxiosResponse } from "axios";
import { BookMark } from "../../types/bookmark";
import { UserDataType } from "../../types/user";
import { authAxios } from "./axios";
//user
export const signOut = (payload: TSignOut) => authAxios.post("auth/sign-out", payload);
export const signIn = (payload: TSignIn) => authAxios.post("auth/sign-in", payload);
export const transferWallet = (payload: TTransferWallet) => authAxios.post("auth/transfers-wallet", payload);
export const refreshToken = (payload: TRefreshToken) => authAxios.get("auth/refresh-token", { params: payload });
//auth
export const getInfo = (payload: TGetInfo) =>
  authAxios.get<any, AxiosResponse<UserDataType, any>>("user/info", { params: payload });
export const editInfo = (payload: TEditUser) => authAxios.put("user/edit", payload);
export const getNonce = (payload: TGetNonce) => authAxios.get<NonceObject>("auth/get-nonce", { params: payload });
export const existEmail = (payload: TCheckExistEmail) => authAxios.get("user/exist-email", { params: payload });
export const existUserName = (payload: TCheckExistUsername) =>
  authAxios.get("user/exist-username", { params: payload });
//note
export const addPrivateNote = (payload: TAddPrivateNote) => authAxios.post("note/add", payload);
export const editPrivateNote = (payload: TEditPrivateNote) => authAxios.put("note/edit", {}, { params: payload });
export const removePrivateNote = (noteId: number) => authAxios.delete(`note/delete/${noteId}`);
//
export const addBookmark = (payload: BookMark) =>
  authAxios.post<any, AxiosResponse<BookMark, any>>("/bookmark/add", payload);
export const addListBookmark = (payload: BookMark[]) =>
  authAxios.post<any, AxiosResponse<BookMark[], any>>("/bookmark/add-list", { bookMarks: payload });
export const deleteBookmark = (id: number) => authAxios.delete("/bookmark/delete/" + id);
export const getAllBookmarks = (network: string) =>
  authAxios.get<any, AxiosResponse<BookMark[], any>>("bookmark/find-all-key?network=" + network);
