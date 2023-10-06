import { NETWORKS } from "../commons/utils/constants";

export declare type SupportedWallets = "Flint" | "Nami" | "Eternl" | "Yoroi" | "Typhon" | "Yoroi nightly";

export type Wallet = {
  name: SupportedWallets;
  icon: string;
  link: string;
  networks: NETWORKS[];
};
export declare interface UserDataType {
  avatar: string;
  email: string;
  address: string;
  wallet: string;
  username: string;
  sizeBookmark: number;
  sizeNote: number;
  lastLogin: string;
  loginType: string;
}

export declare interface UserStoreType {
  userData: UserDataType | null;
  wallet: SupportedWallets | null;
  address: string | null;
  chainID: string | null;
  provider: any;
  openModal: boolean;
  sidebar: boolean;
  onDetailView: boolean;
  openSyncBookmarkModal?: boolean;
  modalRegister: boolean;
  modalSignMessage: boolean;
  nonce: NonceObject | null;
}
