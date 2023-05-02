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
