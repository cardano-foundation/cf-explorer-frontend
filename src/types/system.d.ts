declare type ValueOf<T> = T[keyof T];

declare type SpecialPath = ValueOf<typeof import("src/commons/routers").routers>;

declare interface SystemStoreType {
  currentEpoch: EpochCurrentType | null;
  blockNo?: number;
  blockKey?: number | string;
  specialPath: SpecialPath | null;
  wineryName?: Record<string, Record<"name" | "address", string>> | null;
  wineryNameLoading?: boolean;
}

declare type EventData =
  | {
      eventType: import("src/commons/utils/constants").EVENT_TYPES.BLOCK;
      payload: {
        blockHash: string;
        blockNo: number;
        epochSummary: EpochCurrentType;
        hasTx: boolean;
      };
    }
  | {
      eventType:
        | import("src/commons/utils/constants").EVENT_TYPES.CURRENT_PRICE_BTC
        | import("src/commons/utils/constants").EVENT_TYPES.CURRENT_PRICE_USD;
      payload: CardanoMarket[];
    };
