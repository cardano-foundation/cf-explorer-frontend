interface Transactions {
  hash: string;
  blockNo: number;
  epochNo: number;
  slot: number;
  addressesInput: string[];
  addressesOutput: string[];
  fee: number;
  totalOutput: number;
}
