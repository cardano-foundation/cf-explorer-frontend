export const API = {
  ADDRESS: {
    ANALYTICS: "addresses/analytics",
    DETAIL: "addresses",
    MIN_MAX_BALANCE: "addresses/min-max-balance",
    TOP_ADDRESS: "addresses/top-addresses",
    TOKENS: "addresses/:address/tokens",
  },
  BLOCK: {
    DETAIL: "blocks",
    LIST: "blocks",
  },
  CONTRACT: "contracts",
  DELEGATION: {
    HEADER: "delegations/header",
    POOL_ANALYTICS: "delegations/pool-detail-analytics",
    POOL_DETAIL_HEADER: "delegations/pool-detail-header",
    POOL_DETAIL: "delegations/pool-detail",
    POOL_LIST: "delegations/pool-list",
    TOP: "delegations/top",
  },
  EPOCH: {
    CURRENT_EPOCH: "epochs/current",
    DETAIL: "epochs",
    LIST: "epochs",
  },
  POLICY: "policies",
  POOL: "pools",
  TOKEN: "tokens",
  TOKEN_TRX: "tokens/:tokenId/txs",
  TRANSACTION: {
    CURRENT: "txs/current",
    DETAIL: "txs",
    LIST: "txs",
    GRAPH: "txs/graph",
  },
  STAKE: {
    ANALYTICS_BALANCE: "stakes/analytics-balance",
    ANALYTICS_REWARD: "stakes/analytics-reward",
    DETAIL: "stakes",
    DE_REGISTRATION: "stakes/de-registration",
    TOP_DELEGATOR: "stakes/top-delegators",
    REGISTRATION: "stakes/registration",
    MIN_MAX_BALANCE: "stakes/min-max-balance",
  },
  MARKETS: "markets",
};

export const USER_API = {
  ACTIVITY_LOG: "user/activities-log",
  INFO: "user/info",
  BOOKMARK: "find-all-key",
};
