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
  stakingLifeCycleEvents: {type: string}[];
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

interface IADATransferReport {
  txHash: string;
  amount: number;
  time: string;
  fee: number;
  type: "SENT" | "RECEIVED" | "FEE_PAID" | "CERTIFICATE_FEE_PAID" | "CERTIFICATE_DEPOSIT_PAID";
  status: "FAIL" | "SUCCESS" | "PENDING";
}

interface IReportStaking {
  eventDelegation: boolean;
  eventDeregistration: boolean;
  eventRegistration: boolean;
  eventRewards: boolean;
  eventWithdrawal: boolean;
  fromDate: string;
  id: number;
}

interface IPoolReportSummary {
  event: string;
  reportName: string;
}