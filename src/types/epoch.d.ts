enum EPOCH_STATUS {
  FINISHED = "Finish",
  REWARDING = "Rewarding",
  IN_PROGRESS = "In Progress",
}
interface IDataEpoch {
  no: number;
  status: keyof typeof EPOCH_STATUS;
  blkCount: number;
  endTime: string;
  startTime: string;
  outSum: number;
  txCount: number;
  epochSlotNo: number;
}

interface IEpoch {
  data: IDataEpoch[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}

interface IBlockEpochDetail extends IDataEpoch {
  slot: string;
  createdBy: string;
  transaction: string;
}
interface EpochCurrentType {
  no: number;
  slot: number;
  totalSlot: number;
}
