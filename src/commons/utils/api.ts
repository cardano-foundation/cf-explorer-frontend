export const API = {
  ADDRESS: {
    ANALYTICS: "address/analytics",
    DETAIL: "address",
    MIN_MAX_BALANCE: "address/min-max-balance",
    TOP_ADDRESS: "address/top-addresses",
  },
  BLOCK: {
    DETAIL: "block",
    LIST: "block/list",
  },
  CONTRACT: "contracts",
  DELEGATION: {
    HEADER: "delegation/header",
    POOL_ANALYTICS: "delegation/pool-detail-analytics",
    POOL_DETAIL_HEADER: "delegation/pool-detail-header",
    POOL_DETAIL: "delegation/pool-detail",
    POOL_LIST: "delegation/pool-list",
    TOP: "delegation/top",
  },
  EPOCH: {
    CURRENT_EPOCH: "epoch/current",
    DETAIL: "epoch",
    LIST: "epoch/list",
  },
  POLICY: "policy",
  POOL: "pool",
  TOKEN: "tokens",
  TOKEN_TRX: "tokens/:tokenId/txs",
  TRANSACTION: {
    CURRENT: "txs/current",
    DETAIL: "txs",
    LIST: "txs/list",
    GRAPH: "txs/graph",
  },
  STAKE: {
    ANALYTICS: "stake/analytics",
    DETAIL: "stake",
    DE_REGISTRATION: "stake/de-registration",
    TOP_DELEGATOR: "stake/top-delegators",
    REGISTRATION: "stake/registration",
  },
  MARKETS: "markets",
};

export const USER_API = {
  ACTIVITY_LOG: "user/activities-log",
  INFO: "user/info",
  BOOKMARK: "find-all-key",
};
