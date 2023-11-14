type PoolStatus = import("src/commons/utils/constants").POOL_STATUS;
type PoolActionType = import("src/commons/utils/constants").POOL_ACTION_TYPE;

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
  poolStatus: PoolStatus;
  createDate: string;
  rewardAccounts: string[];
  ownerAccounts: string[];
  poolSize: number;
  stakeLimit: number;
  delegators: number;
  saturation: number;
  totalBalanceOfPoolOwners: number;
  reward: number;
  ros: number;
  pledge: number;
  cost: number;
  margin: number;
  epochBlock: number;
  lifetimeBlock: number;
  description?: string;
  hashView?: string;
  homepage?: string;
  iconUrl?: string;
  logoUrl?: string;
}

interface DelegationEpoch {
  epoch: number;
  block: number;
  stakeAmount: number;
  delegators?: number;
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

interface CertificateHistory {
  txHash: string;
  createdAt: string;
  block: number;
  epoch: number;
  slot: number;
  absoluteSlot: number;
  actions: PoolActionType[];
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

type TabPoolDetail = "epochs" | "delegators" | "certificatesHistory";
