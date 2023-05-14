enum TransactionStatus {
  FAIL = 'FAIL',
  SUCCESS = 'SUCCESS',
  PENDDING = 'PENDDING'
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
enum ConfirmationStatus {
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  HIGH = 'HIGH'
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
}
interface CurrentTransactions {
  blockNo: number;
  fromAddress: string[];
  toAddress: string[];
  amount: number;
  hash: string;
  status: 'FAIL' | 'SUCCESS' | 'PENDING';
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
  };
  rewardAccount: string;
  type: string;
  vrfKey: string;
};

type TStakeCertificated = {
  stakeAddress: string;
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
    stakeAddressTxInputs: {
      address: string;
      value: number;
      tokens: {
        assetName: string;
        assetQuantity: number;
        assetId: string;
        policy: {
          policyId: string;
          totalToken: number;
          policyScript: string;
        };
      }[];
    }[];

    stakeAddressTxOutputs: {
      address: string;
      value: number;
      tokens: {
        assetName: string;
        assetQuantity: number;
        assetId: string;
        policy: {
          policyId: string;
          totalToken: number;
          policyScript: string;
        };
      }[];
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
      tokens: [
        {
          assetName: string;
          assetQuantity: number;
          assetId: string;
          policy: {
            policyId: string;
            totalToken: number;
            policyScript: string;
          };
        }
      ];
    }[];
    outputs: {
      address: string;
      value: number;
      txHash: string;
      tokens: [
        {
          assetName: string;
          assetQuantity: number;
          assetId: string;
          policy: {
            policyId: string;
            totalToken: number;
            policyScript: string;
          };
        }
      ];
    }[];
  };
  mints?: {
    assetName: string;
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
}

interface CollateralResponses {
  address: string;
  assetId: string;
  index: string;
  txHash: string;
  value: number;
  tokens: {
    assetName: string;
    assetQuantity: number;
    assetId: string;
    policy: {
      policyId: string;
      totalToken: number;
      policyScript: string;
    };
  }[];
}

type TProtocolMerge = {
  oldValue?: number;
  value?: number;
  protocol: string;
};
