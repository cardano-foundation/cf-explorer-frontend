interface OverViewDelegation {
  countDownEndTime: number;
  delegators: number;
  epochNo: number;
  epochSlotNo: number;
  liveStake: number;
  activePools: number;
  retiredPools: number;
}

interface Delegators {
  poolId: string;
  poolName: string;
  poolSize: number;
  reward: number;
  feePercent: number;
  feeAmount: number;
  pledge: number;
  saturation: number;
  stakeLimit;
  numberDelegators?: number;
  lifetimeBlock?: number;
  lifetimeRos?: number;
  epochBlock?: number;
  tickerName?: string;
}

interface DelegationOverview {
  poolName: string;
  tickerName: string;
  poolView: string;
  createDate: string;
  rewardAccounts: string[];
  ownerAccounts: string[];
  poolSize: number;
  stakeLimit: number;
  delegators: number;
  saturation: number;
  reward: number;
  ros: number;
  pledge: number;
  cost: number;
  margin: number;
  epochBlock: number;
  lifetimeBlock: number;
  hashView?: string;
}

interface DelegationEpoch {
  epoch: number;
  block: number;
  stakeAmount: number;
  delegators: number;
  fee: number;
  ros: number;
}
interface StakingDelegators {
  address: string;
  view: string;
  totalStake: number;
  time: string;
  fee: number;
}
interface AnalyticsDelegators {
  epochChart: {
    highest: number;
    lowest: number;
    dataByDays: [
      {
        epochNo: number;
        totalStake: number;
      }
    ];
  };
  delegatorChart: {
    highest: number;
    lowest: number;
    dataByDays: [
      {
        epochNo: number;
        numberDelegator: number;
      }
    ];
  };
}

type TabPoolDetail = "epochs" | "delegators";
