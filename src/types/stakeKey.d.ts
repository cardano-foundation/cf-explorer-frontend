interface IStakeKey {
  txId: number;
  txHash: string;
  txTime: string;
  block: number;
  epoch: number;
  slotNo: number;
  epochSlotNo: number;
  stakeKey: string;
  poolNames: string[];
}

type StakeStatus = "ACTIVE" | "DEACTIVATED";

interface IStakeKeyDetail {
  status: StakeStatus;
  stakeAddress: string;
  totalStake: number;
  rewardAvailable: number;
  rewardWithdrawn: number;
  rewardPools: string[];
  pool: {
    tickerName: string;
    poolName: string;
    poolId: string;
    iconUrl?: string;
    logoUrl?: string;
  };
}

type TabStakeDetail = "delegation" | "stake-key" | "withdrawal" | "instantaneous" | "transactions";

interface DelegationHistory {
  time: string;
  epochNo: number;
  blockNo: number;
  epochSlotNo: number;
  txHash: string;
  poolId: string;
  poolData: string;
}

interface Instantaneous {
  time: string;
  epochNo: number;
  blockNo: number;
  amount: string;
  epochSlotNo: number;
  txHash: string;
}

interface StakeHistory {
  time: string;
  epochNo: number;
  blockNo: number;
  epochSlotNo: number;
  txHash: string;
  action: "Registered" | "De Registered";
}

interface WithdrawalHistory {
  time: string;
  epochNo: number;
  blockNo: number;
  amount: string;
  epochSlotNo: number;
  txHash: string;
}

interface TopDelegator {
  stakeKey: string;
  balance: number;
  poolId: string;
  tickerName: string;
  poolName: string;
}

interface StakeAnalytics {
  activeStake: number;
  liveStake: number;
}

interface RegistrationItem {
  txHash: string;
  fee: number;
  deposit: number;
  time: string;
}

interface DelegationItem {
  txHash: string;
  outSum: number;
  fee: number;
  time: string;
}

interface RewardDistributionItem {
  epoch: number;
  time: string;
  amount: number;
  type: string;
}

interface WithdrawItem {
  txHash: string;
  value: number;
  time: string;
  fee: number;
}

interface WithdrawalHistoryItem {
  amount: number;
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  fee: number;
  time: string;
  txHash: string;
  txId: number;
}

type DeregistrationItem = RegistrationItem;

interface StakeDelegations {
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  pools: string[];
  stakeKeys: string[];
  time: string;
  txHash: string;
}

interface InstantRewards {
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  numberOfStakes: number;
  time: string;
  txHash: string;
  rewards: number;
}
