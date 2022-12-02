interface ISignature {
  publicKey: string;
  signature: string;
}

interface ITokenValue {
  signatures: ISignature[];
  sequenceNumber: number;
  value: number | string;
}

interface ITokenMetadata {
  policy: string;
  name: ITokenValue;
  url: ITokenValue;
  description: ITokenValue;
  logo: ITokenValue;
  ticker: ITokenValue;
  decimals: ITokenValue;
  subject: string;
}

interface IToken {
  tokenId: string;
  assetName: string;
  totalTransactions: number;
  totalSupply: number;
  dateCreated: string;
}
