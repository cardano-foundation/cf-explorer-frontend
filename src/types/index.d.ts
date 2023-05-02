type FilterParams =
  | "all"
  | "epochs"
  | "blocks"
  | "txs"
  | "tokens"
  | "stakes"
  | "addresses"
  | "contract"
  | "delegations/pool-detail-header"
  | "delegation-lifecycle"
  | "spo-lifecycle";

interface SearchParams {
  filter?: FilterParams;
  search?: string;
}

type NETWORKS = import("../commons/utils/constants").NETWORKS;

type ACCOUNT_ERROR = import("../commons/utils/constants").ACCOUNT_ERROR;

type RootState = import("../stores/types").RootState;
