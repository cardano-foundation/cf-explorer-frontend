type DetailHeaderTitle = {
  title: number | string;
  hash: string;
  slotLeader?: boolean;
  status?: keyof typeof TransactionStatus;
};

type DetailHeaderBlock = {
  epochNo: number;
  epochSlot: number;
  maxEpochSlot?: number;
  blockNo: number;
};

type DetailHeaderConfirm = {
  confirmation: number;
  status: keyof typeof ConfirmationStatus;
};

type DetailHeaderFees = {
  fee: number;
  token?: string;
};
type DetailHeaderTotalOutput = {
  totalOutput: number;
  token?: string;
};
type DetailHeaderProgress = {
  progress: number;
  status: keyof typeof EpochStatus;
};

interface TransactionHeaderDetail {
  type: "transaction";
  header: DetailHeaderTitle;
  blockDetail: DetailHeaderBlock;
  confirmation: DetailHeaderConfirm;
  transactionFees: DetailHeaderFees;
  totalOutput?: null;
  progress?: null;
}

interface BlockHeaderDetail {
  type: "block";
  header: DetailHeaderTitle;
  blockDetail: DetailHeaderBlock;
  confirmation?: null;
  transactionFees: DetailHeaderFees;
  totalOutput: DetailHeaderTotalOutput;
  progress?: null;
}

interface EpochHeaderDetail {
  type: "epoch";
  header: DetailHeaderTitle;
  blockDetail: DetailHeaderBlock;
  confirmation?: null;
  transactionFees?: null;
  totalOutput?: DetailHeaderTotalOutput;
  progress: DetailHeaderProgress;
}
