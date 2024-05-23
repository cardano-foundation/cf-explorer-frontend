type TransactionStatus = import("src/commons/utils/constants").TRANSACTION_STATUS;

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

interface IContractItemTx {
  contract: string;
  address: string;
  datumBytesIn: string;
  datumBytesOut: string;
  datumHashIn: string;
  datumHashOut: string;
  purpose: string;
  redeemerBytes: string;
  redeemerMem: number;
  redeemerSteps: number;
  governanceAction?: string;
  governanceActionMetadata?: string;
  voterType?: string;
  vote?: string;
  dRepId?: string;
  submissionDate?: string;
  expireDate?: string;
  proposalPolicy?: string;
  scriptBytes: string;
  scriptHash: string;
  stakeAddress?: string;
  burningTokens?: {
    displayName: string;
    fingerprint: string;
    name: string;
    quantity: number;
    metadata: DMetadata;
  }[];
  mintingTokens?: {
    displayName: string;
    fingerprint: string;
    name: string;
    quantity: number;
    metadata: DMetadata;
  }[];
  utxoHash?: string;
  utxoIndex?: number;
  redeemerCertType?: "DELEGATION" | "STAKE_DEREGISTRATION";
  referenceInputs?: ReferenceInput[];
}
interface ReferenceInput {
  address: string;
  index: number;
  script: string;
  scriptHash: string;
  txHash: string;
  value: number;
  datumHash: string;
  datum: string;
  scriptType: string;
}
interface DMetadata {
  decimals: number;
}

type TTCIPProperties = {
  index: string;
  property: string;
  format: string;
  value: string;
  valid: boolean;
  valueFormat?: string;
  checkNotRequired?: boolean;
  valueFormat?: string;
};

interface Transaction {
  tx: {
    hash: string;
    time: string;
    blockNo: number;
    epochSlot: number;
    epochNo: number;
    status: TransactionStatus;
    confirmation: number;
    fee: number;
    totalOutput: number;
    maxEpochSlot: number;
    slotNo: number;
  };
  summary: {
    stakeAddress: {
      address: string;
      value: number;
      fee?: number;
      tokens: Token[];
    }[];
  };
  contracts?: IContractItemTx[];
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
  signersInformation?: SignersInformation[];
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
    metadataCIP20: { valid?: boolean; requiredProperties?: TTCIP25Properties[] };
    metadataCIP83: { valid?: boolean; requiredProperties?: TTCIP25Properties[] };
    metadataCIP25: CIP;
    metadataCIP60: CIP;
    metadataBolnisi: {
      cid: string;
      cidVerified: boolean;
      externalApiAvailable: boolean;
      wineryData: WineryData[];
    };
  }[];
}

interface WineryData {
  pkeyVerified: boolean;
  wineryId: string;
  lots: BolnisiWineLots[];
  externalApiAvailable: boolean;
}
interface BolnisiWineLots {
  offChainData: {
    bottling_date: string;
    bottling_location: string;
    country_of_origin: string;
    fermentation_duration: string;
    fermentation_vessel: string;
    harvest_date: string;
    harvest_location: string;
    lot_number: string;
    number_of_bottles: number;
    origin: string;
    pressing_date: string;
    processing_location: string;
    produced_by: string;
    producer_address: string;
    producer_latitude: number;
    producer_longitude: number;
    storage_vessel: string;
    varietal_name: string;
    vintage_year: number;
    wine_color: string;
    wine_name: string;
    wine_type: string;
  };
  signatureVerified: boolean;
}

interface CIP {
  tokenMap?: TokenMap;
  valid?: boolean;
  version?: TTCIP25Properties;
}

interface TokenMap
  extends Record<
    string,
    {
      optionalProperties: TTCIP25Properties[];
      requireProperties: TTCIP25Properties[];
      tokenName: string;
    }
  > {
  valid?: boolean;
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

type SignersInformation = {
  delegateKey?: string;
  publicKey?: string;
};
