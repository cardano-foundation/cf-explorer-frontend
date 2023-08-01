declare type ValueOf<T> = T[keyof T];

declare type SpecialPath = ValueOf<typeof import("src/commons/routers").routers>;

declare interface SystemStoreType {
  adaRate: number;
  usdMarket: CardanoMarket | null;
  currentEpoch: EpochCurrentType | null;
  loadingCurrentEpoch: boolean;
  specialPath: SpecialPath | null;
}
