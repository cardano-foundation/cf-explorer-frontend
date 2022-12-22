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

type TabStakeDetail = "delegation" | "stakeKey" | "withdrawal" | "instantaneous";
