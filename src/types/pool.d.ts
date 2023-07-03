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
<<<<<<< HEAD
  lifetimeRos: number;
=======
>>>>>>> 162dc68f23e51f9d43af4f5e215cfabae2b9e4ae
}

type DelegationPoolDetail = DelegationPool & {
  slotLeaded: string;
  transactionFees: string;
  totalOutput: string;
};
