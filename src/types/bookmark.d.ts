import { NETWORK_TYPES } from "../commons/utils/constants";

interface BookMark {
  createdDate?: string;
  id?: number;
  keyword: string;
  type: "BLOCK" | "EPOCH" | "TRANSACTION" | "ADDRESS" | "POOL" | "STAKE_KEY";
  urlPage?: string;
  network: NETWORK_TYPES[keyof NETWORK_TYPES];
}
