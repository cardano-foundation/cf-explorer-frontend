interface IBodyReportStakeKey {
  stakeKey: string;
  reportName: string;
  fromDate: string;
  toDate: string;
  isADATransfer: boolean;
  isFeesPaid: boolean;
  eventDelegation: boolean;
  eventDeregistration: boolean;
  eventRegistration: boolean;
  eventRewards: boolean;
  eventWithdrawal: boolean;
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
  stakingLifeCycleEvents: { type: string }[];
}

interface IPoolReportList {
  reportName: string;
  epochRanges: number[];
  toDate: string;
  isPoolSize: boolean;
  isFeesPaid: boolean;
  event: string;
  reportId: number;
  eventDeregistration: boolean;
  eventPoolUpdate: boolean;
  eventRegistration: boolean;
  eventReward: boolean;
  poolView: string;
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
  id: number;
  stakeKey: string;
  username: string;
  reportName: string;
  fromDate: string;
  toDate: string;
  isADATransfer: boolean;
  isFeesPaid: boolean;
  status: string;
}

interface IPoolReportSummary {
  event: string;
  reportName: string;
}
