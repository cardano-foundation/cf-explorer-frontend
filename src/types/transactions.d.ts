enum TransactionStatus {
  FAIL = "FAIL",
  SUCCESS = "SUCCESS",
  PENDDING = "PENDDING"
}

interface Transactions {
  hash: string;
  blockNo: number;
  blockHash: string;
  epochNo: number;
  epochSlotNo: number;
  slot: number;
  addressesInput: string[];
  addressesOutput: string[];
  fee: number;
  totalOutput: number;
  time: string;
  balance: number;
  tokens: TransactionToken[];
}

interface TransactionToken {
  address: string;
  addressId: number;
  displayName: string;
  fingerprint: string;
  name: string;
  policy: string;
  quantity: number;
}

interface Token {
  assetName: string;
  assetQuantity: number;
  assetId: string;
  policy?: {
    policyId: string;
    totalToken: number;
    policyScript: string;
  };
  metadata?: {
    decimals: number;
    description: string;
    logo: string;
    ticker: string;
    url: string;
  };
}
interface CurrentTransactions {
  blockNo: number;
  fromAddress: string[];
  toAddress: string[];
  amount: number;
  hash: string;
  status: "FAIL" | "SUCCESS" | "PENDING";
  time: string;
  slot: number;
  epochNo: number;
  epochSlotNo: number;
}

type TProtocol = {
  minFeeA?: number;
  minFeeB?: number;
  maxBlockSize?: number;
  maxTxSize?: number;
  maxBhSize?: number;
  keyDeposit?: number;
  poolDeposit?: number;
  maxEpoch?: number;
  optimalPoolCount?: number;
  influence?: number;
  monetaryExpandRate?: number;
  treasuryGrowthRate?: number;
  decentralisation?: number;
  entropy?: number;
  protocolMajor?: number;
  protocolMinor?: number;
  minUtxoValue?: number;
  minPoolCost?: number;
  costModel?: number;
  priceMem?: number;
  priceStep?: number;
  maxTxExMem?: number;
  maxTxExSteps?: number;
  maxBlockExMem?: number;
  maxBlockExSteps?: number;
  maxValSize?: number;
  collateralPercent?: number;
  maxCollateralInputs?: number;
  coinsPerUtxoSize?: number;
};

type TPoolCertificated = {
  cost: number;
  margin: number;
  metadataHash: string;
  metadataUrl: string;
  pledge: number;
  poolId: string;
  poolOwners: string[];
  relays: {
    dnsName: string;
    dnsSrvName: string;
    ipv4: string;
    ipv6: string;
    port: number;
  }[];
  rewardAccount: string;
  type: "POOL_REGISTRATION" | "POOL_DEREGISTRATION";
  vrfKey: string;
  epoch: number;
};

type TStakeCertificated = {
  stakeAddress: string;
  type: "STAKE_REGISTRATION" | "STAKE_DEREGISTRATION";
};

interface Transaction {
  tx: {
    hash: string;
    time: string;
    blockNo: number;
    epochSlot: number;
    epochNo: number;
    status: keyof typeof TransactionStatus;
    confirmation: number;
    fee: number;
    totalOutput: number;
    maxEpochSlot: number;
  };
  summary: {
    stakeAddress: {
      address: string;
      value: number;
      fee?: number;
      tokens: Token[];
    }[];
  };
  contracts?: {
    contract: string;
  }[];
  collaterals?: {
    collateralInputResponses: CollateralResponses[];

    collateralOutputResponses: CollateralResponses[];
  };
  notes?: {
    note: string;
  }[];
  utxOs?: {
    inputs: {
      address: string;
      value: number;
      txHash: string;
      index: string;
      tokens: Token[];
      stakeAddress?: string;
    }[];
    outputs: {
      address: string;
      value: number;
      txHash: string;
      tokens: Token[];
      index: string;
      stakeAddress?: string;
    }[];
  };
  mints?: {
    assetName: string;
    assetId: string;
    assetQuantity: number;
    policy: string;
    metadata?: {
      decimals: number;
      description: string;
      logo: string;
      ticker: string;
      url: string;
    };
  }[];
  protocols?: TProtocol;
  previousProtocols?: TProtocol;
  delegations?: {
    address: string;
    poolId: string;
  }[];
  withdrawals?: {
    stakeAddressFrom: string;
    addressTo: string[];
    amount: 0;
  }[];
  poolCertificates?: TPoolCertificated[];
  stakeCertificates?: TStakeCertificated[];
  instantaneousRewards?: {
    amount: string;
    stakeAddress: string;
  }[];
  metadataHash: string;
  metadata: {
    label: number;
    value: string;
  }[];
}

interface CollateralResponses {
  address: string;
  assetId: string;
  index: string;
  txHash: string;
  value: number;
  tokens: Token[];
}

type TProtocolMerge = {
  oldValue?: number;
  value?: number;
  protocol: string;
};
