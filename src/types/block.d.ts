interface Block {
  blockNo: number;
  hash: string;
  slotLeader: string;
  time: string;
  totalFees: number;
  totalOutput: number;
  txCount: number;
}

type BlockDetail = Block & {
  epochNo: number;
  epochSlotNo: number;
  slotNo: number;
  totalSlot: number;
  confirmation: number;
};
