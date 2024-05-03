interface Block {
  blockNo: number;
  epochNo: number;
  epochSlotNo: number;
  slotNo: number;
  hash: string;
  slotLeader: string;
  time: string;
  totalFees: number;
  totalOutput: number;
  txCount: number;
  maxEpochSlot: number;
}

type BlockDetail = Block & {
  totalSlot: number;
  confirmation: number;
};
