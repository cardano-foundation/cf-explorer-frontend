type FilterParams =
  | "all"
  | "epochs"
  | "blocks"
  | "txs"
  | "tokens"
  | "stake-keys"
  | "addresses"
  | "contract"
  | "delegations/pool-detail-header"
  | "lifecycle"
  | "policies"
  | "delegations/pool-list?search=";

interface SearchParams {
  filter?: FilterParams;
  search?: string;
}

type NETWORKS = import("../commons/utils/constants").NETWORKS;

type ACCOUNT_ERROR = import("../commons/utils/constants").ACCOUNT_ERROR;

type RootState = import("../stores/types").RootState;
