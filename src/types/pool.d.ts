interface DelegationPool {
  id: string;
  name: string;
  size: number;
  reward: number;
  fee: number;
  feeA: number;
  declaredPledge: number;
  saturation: number;
}

type DelegationPoolDetail = DelegationPool & {
  slotLeaded: string;
  transactionFees: string;
  totalOutput: string;
};
