import { PROTOCOL_TYPE } from "../commons/utils/constants";

type TProtocolItem = {
  oldValue: number;
  time: string;
  transactionHash: string;
  value: number;
};

export type TProtocolCurrent = {
  [key in PROTOCOL_TYPE]: TProtocolItem;
};
