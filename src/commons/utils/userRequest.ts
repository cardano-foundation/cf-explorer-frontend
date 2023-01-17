import { authAxios, uploadAxios } from "./axios";

export const signOut = () => authAxios.post("auth/sign-out");
export const signIn = (payload: any) => authAxios.post("auth/sign-in", payload);
export const editInfo = (payload: any) => uploadAxios.put("user/edit", payload);
export const transferWallet = (payload: any) => authAxios.post("auth/transfers-wallet", payload);

export const addPrivateNote = (payload: TAddPrivateNote) => authAxios.post("note/add", payload);
export const editPrivateNote = (payload: TEditPrivateNote) => authAxios.put("note/edit", {}, { params: payload });
export const removePrivateNote = (noteId: number) => authAxios.delete(`note/delete/${noteId}`);
