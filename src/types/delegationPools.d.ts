type PoolStatus = import("src/commons/utils/constants").POOL_STATUS;
type PoolActionType = import("src/commons/utils/constants").POOL_ACTION_TYPE;
type DrepActionType = import("src/commons/utils/constants").DREP_ACTION_TYPE;

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
  id: number;
  poolId: string;
  poolName: string;
  tickerName: string;
  poolSize: number;
  pledge: number;
  saturation: number;
  stakeLimit: number;
  reserves: number;
  epochBlock: number;
  lifetimeBlock: number;
  votingPower: number;
  governanceParticipationRate: number;
  retired: boolean;
  kparam: number;
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
  stakeAddress: string;
  view: string;
  totalStake: number;
  time: string;
  createdAt: string;
  fee: number;
}

interface CertificateHistory {
  txHash: string;
  blockNo: number;
  epochSlotNo: number;
  slotNo: number;
  actions: PoolActionType[];
  actionTypes: DrepActionType[];
  epochNo: number;
  absoluteSlot: number;
  createdAt: string;
  actionTypes: string;
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

type TabDrepDetail = "delegators" | "certificatesHistory" | "governanceVotes" | "";
type TabPoolDetail = "epochs" | "delegators" | "certificatesHistory" | "governanceVotes" | "";
