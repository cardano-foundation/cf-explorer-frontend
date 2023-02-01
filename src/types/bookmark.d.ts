interface BookMark {
  createdDate?: string;
  id?: number;
  keyword: string;
  type: "BLOCK" | "EPOCH" | "TRANSACTION" | "ADDRESS" | "POOL" | "STAKE_KEY";
  urlPage?: string;
}
