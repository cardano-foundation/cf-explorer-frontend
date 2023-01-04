type FilterParams = "all" | "epoch" | "block" | "tx" | "tokens" | "stake" | "address";

interface SearchParams {
  filter?: FilterParams;
  search?: string;
}
