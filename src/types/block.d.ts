interface Block {
  slot: string;
  blockId: string;
  createdAt: string;
  transactions: number;
  fees: number;
  output: number;
}

type BlockDetail = Block & {
  slotLeaded: string;
  transactionFees: string;
  totalOutput: string;
};
