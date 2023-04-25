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

  TOKEN: { LIST: "tokens", TOKEN_TRX: "tokens/:tokenId/txs", ANALYTICS: "tokens/analytics" },
  TRANSACTION: {
    CURRENT: "txs/current",
    DETAIL: "txs",
    LIST: "txs",
    GRAPH: "txs/graph",
  },
  STAKE: {
    ANALYTICS: "stakes/analytics",
    DETAIL: "stakes",
    DE_REGISTRATION: "stakes/de-registration",
    TOP_DELEGATOR: "stakes/top-delegators",
    REGISTRATION: "stakes/registration",
  },
  STAKE_LIFECYCLE: {
    REGISTRATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/registrations`,
    DELEGATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/delegations`,
    WITHDRAW: (stakeKey: string) => `stake-lifecycle/${stakeKey}/withdrawals`,
    DELEGATION_DETAIL: (stakeKey: string, hash: string) => `stake-lifecycle/${stakeKey}/delegations/${hash}`,
    WITHDRAW_DETAIL: (stakeKey: string, hash: string) => `stake-lifecycle/${stakeKey}/withdrawals/${hash}`,
    DEREGISTRATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/de-registrations`,
    SPO_REGISTRATION: (poolId: string) => `pool-lifecycle/registration?poolView=${poolId}       `,
  },
  SPO_LIFECYCLE: {
    POOL_UPDATE: "pool-lifecycle/pool-update"
  },
  MARKETS: "markets",
};

export const USER_API = {
  ACTIVITY_LOG: "user/activities-log",
  INFO: "user/info",
  BOOKMARK: "find-all-key",
};
