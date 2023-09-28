import { PROTOCOL_TYPE } from "../commons/utils/constants";

type TProtocolItem = {
  time: string;
  transactionHash: string;
  value: any;
  status: "UPDATED" | "ADDED" | "NOT_EXIST" | "NOT_CHANGE";
};
export type ProtocolTypeKey = keyof typeof PROTOCOL_TYPE;

interface TProtocolParam {
  epochChange: {
    startEpoch: number;
    endEpoch: number;
  };
  minFeeA: TProtocolItem;
  minFeeB: TProtocolItem;
  maxBlockSize: TProtocolItem;
  maxTxSize: TProtocolItem;
  maxBhSize: TProtocolItem;
  keyDeposit: TProtocolItem;
  poolDeposit: TProtocolItem;
  maxEpoch: TProtocolItem;
  optimalPoolCount: TProtocolItem;
  influence: TProtocolItem;
  monetaryExpandRate: TProtocolItem;
  treasuryGrowthRate: TProtocolItem;
  decentralisation: TProtocolItem;
  entropy: TProtocolItem;
  protocolMajor: TProtocolItem;
  protocolMinor: TProtocolItem;
  minUtxoValue: TProtocolItem;
  minPoolCost: TProtocolItem;
  costModel: TProtocolItem;
  priceMem: TProtocolItem;
  priceStep: TProtocolItem;
  maxTxExMem: TProtocolItem;
  maxTxExSteps: TProtocolItem;
  maxBlockExMem: TProtocolItem;
  maxBlockExSteps: TProtocolItem;
  maxValSize: TProtocolItem;
  collateralPercent: TProtocolItem;
  maxCollateralInputs: TProtocolItem;
  coinsPerUtxoSize: TProtocolItem;
  timestamp: string;
}

interface ProtocolHistory {
  epochChanges: {
    startEpoch: number;
    endEpoch: number;
  }[];
  minFeeA: TProtocolItem[];
  minFeeB: TProtocolItem[];
  maxBlockSize: TProtocolItem[];
  maxTxSize: TProtocolItem[];
  maxBhSize: TProtocolItem[];
  keyDeposit: TProtocolItem[];
  poolDeposit: TProtocolItem[];
  maxEpoch: TProtocolItem[];
  optimalPoolCount: TProtocolItem[];
  influence: TProtocolItem[];
  monetaryExpandRate: TProtocolItem[];
  treasuryGrowthRate: TProtocolItem[];
  decentralisation: TProtocolItem[];
  entropy: TProtocolItem[];
  protocolMajor: TProtocolItem[];
  protocolMinor: TProtocolItem[];
  minUtxoValue: TProtocolItem[];
  minPoolCost: TProtocolItem[];
  costModel: TProtocolItem[];
  priceMem: TProtocolItem[];
  priceStep: TProtocolItem[];
  maxTxExMem: TProtocolItem[];
  maxTxExSteps: TProtocolItem[];
  maxBlockExMem: TProtocolItem[];
  maxBlockExSteps: TProtocolItem[];
  maxValSize: TProtocolItem[];
  collateralPercent: TProtocolItem[];
  maxCollateralInputs: TProtocolItem[];
  coinsPerUTxOByte: TProtocolItem[];
}
