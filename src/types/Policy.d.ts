interface PolicyDetail {
  policyId: string;
  totalToken: number;
  policyScript: string;
}

interface TokenPolicys {
  name: string;
  displayName: string;
  policy: string;
  fingerprint: string;
  txCount: number;
  supply: string;
  createdOn: string;
  metadata: {
    url: string;
    ticker: string;
    decimals: number;
    logo: string;
    description: string;
  };
}

interface HolderPolicys {
  address: string;
  fingerprint: string;
  tokenName: string;
  quantity: number;
}

interface PolicyHolder {
  address: string;
  fingerprint: string;
  displayName: string;
  quantity: number;
}
