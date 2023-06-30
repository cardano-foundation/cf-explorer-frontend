interface DelegationPool {
  poolId: string;
  poolName: string;
  poolSize: number;
  reward: number;
  feePercent: number;
  feeAmount: number;
  pledge: number;
  saturation: number;
  epochBlock: number;
  lifetimeBlock: number;
}

type DelegationPoolDetail = DelegationPool & {
  slotLeaded: string;
  transactionFees: string;
  totalOutput: string;
};
