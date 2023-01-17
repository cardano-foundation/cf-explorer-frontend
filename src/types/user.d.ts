import { NETWORKS } from "../commons/utils/constants";

export declare type SupportedWallets = "Flint" | "Nami" | "Eternl" | "Yoroi";

export type Wallet = {
  name: SupportedWallets;
  icon: string;
};
export declare type ThemeType = "dark" | "light";

export declare interface UserDataType {
  avatar: string;
  email: string;
  wallet: string;
  username: string;
  sizeBookmark: number;
  sizeNote: number;
  lastLogin: string;
}

export declare interface UserStoreType {
  theme: ThemeType;
  userData: UserDataType | null;
  wallet: SupportedWallets | null;
  address: string | null;
  chainID: string | null;
  provider: any;
  openModal: boolean;
  sidebar: boolean;
  onDetailView: boolean;
  modalRegister: boolean;
}
