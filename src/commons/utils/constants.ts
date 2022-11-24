import { Wallet } from "../../types/user";
import { EternlIcon, FlintIcon, NamiIcon, YoroiIcon } from "../resources";

export const SUPPORTED_WALLETS: Wallet[] = [
  { name: "Flint", icon: FlintIcon },
  { name: "Nami", icon: NamiIcon },
  { name: "Eternl", icon: EternlIcon },
  { name: "Yoroi", icon: YoroiIcon },
];

export const EPOCH_STATUS: any = {
  FINISH: "FINISHED",
  REWARD: "REWARDING",
  INPROGRESS: "IN_PROGRESS",
  FINISHED: "Finish",
  REWARDING: "Rewarding",
  IN_PROGRESS: "In Progress",
};

export const MAX_SLOT_EPOCH = 432000;

export enum NETWORKS {
  mainnet = "Mainnet",
  preprod = "Preprod",
  preview = "Preview",
  testnet = "Testnet (legacy)",
}
