interface Transactions {
  hash: string;
  blockNo: number;
  epochNo: number;
  slot: number;
  addressesInput: string[];
  addressesOutput: string[];
  fee: number;
  totalOutput: number;
  time: string;
}

interface Transaction {
  tx: {
    hash: string;
    time: string;
    blockNo: number;
    epochSlot: number;
    epochNo: number;
    status: string;
    confirmation: number;
    fee: number;
    totalOutput: number;
  };
  summary: {
    stakeAddressTxInputs: {
      address: string;
      value: number;
    }[];

    stakeAddressTxOutputs: {
      address: string;
      value: number;
    }[];
  };
  contracts?: {
    contract: string;
  }[];
  collaterals?: {
    address: string;
    txHash: string;
    amount: number;
  }[];
  notes?: {
    note: string;
  }[];
  utxOs?: {
    inputs: {
      address: string;
      value: number;
      txHash: string;
    }[];
    outputs: {
      address: string;
      value: number;
      txHash: string;
    }[];
  };
  mints?: {
    assetName: string;
    amount: number;
    policy: {
      policyId: string;
      totalToken: number;
      policyScript: string;
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
