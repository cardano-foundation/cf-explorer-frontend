interface ITokenOverview {
  name?: string;
  displayName?: string;
  policy?: string;
  fingerprint?: string;
  txCount?: number;
  supply?: number;
  createdOn?: string;
  metadata?: ITokenMetadata;
}

interface ITokenMetadata {
  policy?: string;
  logo?: string;
  decimals?: number;
  description?: string;
  ticker?: string;
  url?: string;
}

interface IToken extends ITokenOverview, ITokenMetadata {}

interface ITokenTopHolderTable {
  address: string;
  name: string;
  displayName: string;
  fingerprint: string;
  quantity: number;
}

interface ITokenMintingTable {
  txHash: string;
  amount: number;
  time: string;
}
