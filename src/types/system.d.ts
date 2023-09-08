declare type ValueOf<T> = T[keyof T];

declare type SpecialPath = ValueOf<typeof import("src/commons/routers").routers>;

declare interface SystemStoreType {
  adaRate: number;
  usdMarket: CardanoMarket | null;
  btcMarket: CardanoMarket | null;
  currentEpoch: EpochCurrentType | null;
  blockNo?: number;
  specialPath: SpecialPath | null;
}

declare type EventData =
  | {
      eventType: import("src/commons/utils/constants").EVENT_TYPES.BLOCK;
      payload: {
        blockNo: number;
        epochSummary: EpochCurrentType;
      };
    }
  | {
      eventType:
        | import("src/commons/utils/constants").EVENT_TYPES.CURRENT_PRICE_BTC
        | import("src/commons/utils/constants").EVENT_TYPES.CURRENT_PRICE_USD;
      payload: CardanoMarket[];
    };
