interface IStakeKey {
  txId: number;
  txHash: string;
  txTime: string;
  block: number;
  epoch: number;
  slotNo: number;
  stakeKey: string;
  poolNames: string[];
}

type StakeStaus = "ACTIVE" | "DEACTIVATED";

interface IStakeKeyDetail {
  status: StakeStaus;
  stakeAddress: string;
  totalStake: number;
  rewardAvailable: number;
  rewardWithdrawn: number;
  pool: {
    tickerName: string;
    poolName: string;
    poolId: string;
  };
}

type TabStakeDetail = "delegation" | "stake-key" | "withdrawal" | "instantaneous";

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