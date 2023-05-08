interface IBodyReportStakeKey {
  stakeKey: string;
  reportName: string;
  fromDate: string;
  toDate: string;
  isADATransfer: boolean;
  isFeesPaid: boolean;
  stakingLifeCycleEvents: string[];
}

interface IBodyReportStakePool {
  reportName: string;
  poolId: string;
  isPoolSize: boolean;
  isFeesPaid: boolean;
  epochRanges: number[];
  event: string[];
}

interface IStakeKeySummary {
  id: number;
  stakeKey: string;
  username: string;
  reportName: string;
  fromDate: string;
  toDate: string;
  isADATransfer: boolean;
  isFeesPaid: boolean;
  status: string;
  stakingLifeCycleEvents: any;
}

interface IPoolReportList {
  reportName: string;
  epochRanges: number[];
  toDate: string;
  isPoolSize: boolean;
  isFreePaid: boolean;
  event: string;
  reportId: number;
}
