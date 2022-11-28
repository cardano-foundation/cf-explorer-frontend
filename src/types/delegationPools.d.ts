interface OverViewDelegation {
  countDownEndTime: number;
  delegators: number;
  epochNo: number;
  epochSlotNo: number;
  liveStake: number;
}

interface Delegators {
  poolId: number;
  poolName: string;
  poolSize: number;
  reward: number;
  feePercent: number;
  feeAmount: number;
  pledge: number;
  saturation: number;
}

interface Delegator {
  poolName: string;
  tickerName: string;
  poolView: string;
  createDate: string;
  rewardAccount: string;
  ownerAccount: string;
  poolSize: number;
  stakeLimit: number;
  delegators: number;
  saturation: number;
  reward: number;
  fee: number;
  ros: number;
  pledge: number;
  cost: number;
  margin: number;
  epochBlock: number;
  lifetimeBlock: number;
}

interface DelegatorEpoch {
  epoch: number;
  block: number;
  stakeAmount: number;
  delegatorReward: number;
  fees: number;
  ros: number;
}
