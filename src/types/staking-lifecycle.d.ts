declare type LifecycleReportType = "stake-key-reports" | "pool-reports";

declare type ViewMode = "tabular" | "timeline";

declare type DelegationStep = TTabularTabKey;

declare interface ListStakeKeyResponse {
  [key: string]: boolean;
  hasDeRegistration: boolean;
  hasDelegation: boolean;
  hasRegistration: boolean;
  hasWithdrawal: boolean;
  hashRewards: boolean;
}

declare type DistributionTotal = {
  totalDelegatorRewards: number;
  totalOperatorRewards: number;
};
