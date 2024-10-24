import { PROTOCOL_TYPE } from "../commons/utils/constants";

type TProtocolItem = {
  time: string;
  transactionHashs: string[];
  value: string | number;
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
  maxBHSize: TProtocolItem;
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
  coinsPerUTxOByte: TProtocolItem;
  timestamp: string;
  maxTxExUnits: TProtocolItem;
  maxBBSize: TProtocolItem;
  maxBlockExUnits: TProtocolItem;
  rho: TProtocolItem;
  tau: TProtocolItem;
  prices: TProtocolItem;
  a0: TProtocolItem;
  eMax: TProtocolItem;
  nOpt: TProtocolItem;
  costModels: TProtocolItem;
  collateralPercentage: TProtocolItem;
  govActionLifetime: TProtocolItem;
  govActionDeposit: TProtocolItem;
  drepDeposit: TProtocolItem;
  drepActivity: TProtocolItem;
  ccMinSize: TProtocolItem;
  ccMaxTermLength: TProtocolItem;
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

interface ProtocolFixed {
  activeSlotsCoeff: number;
  genDelegs: Record<string, Record<string, string>>;
  updateQuorum: 0;
  networkId: string;
  initialFunds: Record<string, object>;
  maxLovelaceSupply: number;
  networkMagic: number;
  epochLength: number;
  timestamp: string;
  slotsPerKESPeriod: number;
  slotLength: number;
  maxKESEvolutions: number;
  securityParam: number;
}
