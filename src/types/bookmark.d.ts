declare type NETWORK_TYPES = import("../commons/utils/constants").NETWORK_TYPES;

declare interface Bookmark {
  createdDate?: string;
  id?: number;
  keyword: string;
  type: "BLOCK" | "EPOCH" | "TRANSACTION" | "ADDRESS" | "POOL" | "STAKE_KEY" | "TOKEN";
  urlPage?: string;
  network: NETWORK_TYPES;
}

interface BookmarkResp {
  passNumber: number;
  failNumber: number;
}
