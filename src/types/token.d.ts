interface ITokenOverview {
  name?: string;
  displayName?: string;
  policy?: string;
  fingerprint?: string;
  txCount?: number;
  supply?: number;
  createdOn?: string;
}

interface ITokenMetadata {
  policy?: string;
  logo?: string;
  decimals?: number;
}

interface IToken extends ITokenOverview, ITokenMetadata {}
