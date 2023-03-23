declare interface SystemStoreType {
  adaRate: number;
  usdMarket: CardanoMarket | null;
  currentEpoch: EpochCurrentType | null;
  loadingCurrentEpoch: boolean;
}
