interface WalletAddressAnalyst {
  date: string;
  value: number;
}
interface WalletAddress {
  address: string;
  txCount: number;
  balance: number;
  tokens: [
    {
      address: string;
      name: string;
      displayName: string;
      fingerprint: string;
      quantity: number;
    }
  ];
  stakeAddress: string;
}
