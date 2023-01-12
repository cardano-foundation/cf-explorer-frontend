type FilterParams = "all" | "epoch" | "block" | "tx" | "tokens" | "stake" | "address" | "delegation/pool-detail-header";

interface SearchParams {
  filter?: FilterParams;
  search?: string;
}
