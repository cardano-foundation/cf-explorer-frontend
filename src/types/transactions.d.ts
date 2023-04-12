enum TransactionStatus {
  FAIL = "FAIL",
  SUCCESS = "SUCCESS",
  PENDDING = "PENDDING",
}
enum ConfirmationStatus {
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  HIGH = "HIGH",
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
  status: "FAIL" | "SUCCESS" | "PENDING";
}

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
  delegations?: {
    address: string;
    poolId: string;
  }[];
  withdrawals?: {
    stakeAddressFrom: string;
    addressTo: string[];
    amount: 0;
  }[];
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
