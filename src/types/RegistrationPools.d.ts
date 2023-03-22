interface Registration {
  txId: number;
  txHash: string;
  txTime: string;
  block: number;
  epoch: number;
  slotNo: number;
  poolName: string;
  pledge: number;
  cost: number;
  margin: number;
  stakeKey: string[];
  poolId: string;
  poolView: string;
}
