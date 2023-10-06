import { AxiosResponse } from "axios";
import { stringify } from "qs";

import { UserDataType } from "../../types/user";
import defaultAxios, { authAxios, defaultAxiosDownload } from "./axios";
import { API } from "./api";
import { NETWORK, NETWORK_TYPES } from "./constants";
//user
export const signOut = (payload: TSignOut) => authAxios.post("auth/sign-out", payload);
export const signIn = (payload: TSignIn) => authAxios.post("auth/sign-in", payload);
export const signUp = (payload: TSignUp) => authAxios.post("auth/sign-up", payload);
export const verifyActive = (payload: TVerifyActive) => authAxios.get("verify/active", { params: payload });
export const forgotPassword = (payload: TForgotPassword) =>
  authAxios.get("verify/forgot-password", { params: payload });
export const resetPassword = (payload: TResetPassword) => authAxios.put("verify/reset-password", payload);
export const verifyCodeResetPassword = (payload: TVerifyCodeResetPassword) =>
  authAxios.get("verify/expired-code", { params: payload });
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
export const checkTrxHash = (payload: string) => defaultAxios.get(API.TRANSACTION.DETAIL + "/" + payload);
export const addPrivateNote = (payload: TAddPrivateNote) => authAxios.post("note/add", payload);
export const editPrivateNote = (payload: TEditPrivateNote) => authAxios.put("note/edit", {}, { params: payload });
export const removePrivateNote = (noteId: number) => authAxios.delete(`note/delete/${noteId}`);
//
export const addBookmark = (payload: Bookmark) =>
  authAxios.post<any, AxiosResponse<Bookmark, any>>("/bookmark/add", payload);
export const addListBookmark = (payload: Bookmark[]) =>
  authAxios.post<any, AxiosResponse<{ passNumber: number; failNumber: number }, any>>("/bookmark/add-list", {
    bookMarks: payload
  });
export const deleteBookmark = ({
  type,
  network = NETWORK_TYPES[NETWORK],
  keyword
}: {
  type?: string;
  network?: NETWORK_TYPES;
  keyword: string;
}) => authAxios.delete(`/bookmark/delete?${stringify({ type, network, keyword })}`);
export const getAllBookmarks = (network: string) =>
  authAxios.get<any, AxiosResponse<Bookmark[], any>>("bookmark/find-all-key?network=" + network);

// report
export const generateStakeKeyReport = (payload: IBodyReportStakeKey) =>
  defaultAxios.post("staking-lifecycle/report/stake-key", payload);

export const generateStakePoolReport = (payload: IBodyReportStakePool) =>
  defaultAxios.post("pool-report/create", payload);

export const downloadStakeKeyReport = (reportId: number) =>
  defaultAxiosDownload.get(`staking-lifecycle/report/stake-key/${reportId}/export`, {});
