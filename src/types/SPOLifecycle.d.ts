interface PoolUpdateItem {
  poolUpdateId: number;
  txHash: string;
  fee: 0;
  time: string;
}

interface PoolInfo {
  poolId: string;
  poolName: string;
  poolView: string;
  stakeKeys: string[];
}

interface PoolUpdateDetail {
  poolUpdateId: number;
  poolId: string;
  poolName: string;
  poolView: string;
  previousPledge: number;
  previousMargin: number;
  txHash: string;
  time: string;
  stakeKeys: string[];
  fee: number;
  rewardAccount: string;
  vrfKey: string;
  pledge: number;
  margin: number;
  cost: number;
}
interface SPORegistration {
  poolUpdateId: number;
  txHash: string;
  fee: number;
  time: string;
  margin: number;
}

interface SPORegistrationTabpular {
  poolUpdateId: number;
  txHash: string;
  totalFee: number;
  time: string;
  fee: number;
  stakeKeys: string[];
  deposit: number;
}

interface SPODeregistrationTabpular {
  poolId: string;
  poolName: string;
  poolView: string;
  stakeKeys: string[];
  txHash: string;
  totalFee: number;
  poolHold: number;
  time: string;
  fee: number;
  retiringEpoch: number;
}

interface SPORegistrationDetail {
  cost: number;
  deposit: number;
  fee: number;
  margin: number;
  pledge: number;
  poolId: string;
  poolName: string;
  poolView: string;
  rewardAccount: string;
  stakeKeys: string[];
  time: string;
  totalFee: number;
  txHash: string;
  vrfKey: string;
}
interface SPODeregistration {
  poolId: string;
  poolName: string;
  poolView: string;
  stakeKeys: string[];
  txHash: string;
  totalFee: number;
  poolHold: number;
  time: string;
  fee: number;
  retiringEpoch: number;
}
interface SPO_REWARD {
  epochNo: number;
  time: string;
  amount: number;
  rewardAccount: string;
}
interface WalletActivityIF {
  txHash: string;
  amount: number;
  fee: number;
  time: string;
  type: "SENT" | "RECEIVED" | "FEE_PAID" | "CERTIFICATE_FEE_PAID" | "CERTIFICATE_DEPOSIT_PAID";
  status: "FAIL" | "SUCCESS" | "PENDING";
}
interface RewardActivityIF {
  epochNo: number;
  amount: number;
  time: string;
  type: "REWARD_WITHDRAWN" | "REWARD_RECEIVED";
}

interface PoolInfo {
  poolId: string;
  poolName: string;
  poolView: string;
  poolSize: number;
  rewardAvailable: number;
  status: "ACTIVE" | "INACTIVE" | "RETIRING";
  epochNo: number;
  stakeKeys: string[];
}

interface IDashboardResponse {
  id: number;
  poolReportId: number;
  stakeKeyReportId:number;
  createdAt: string;
  reportName: string;
  status: string;
  type: string;
}
