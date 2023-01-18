import { COINGECKO_URL } from "./constants";

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
  TRANSACTION: {
    CURRENT: "tx/current",
    DETAIL: "tx",
    LIST: "tx/list",
    GRAPH: "tx/graph",
  },
  STAKE: {
    ADDRESS_DETAIL: "stake/address",
    ANALYTICS: "stake/analytics",
    DETAIL: "stake",
    DE_REGISTRATION: "stake/de-registration",
    TOP_DELEGATOR: "stake/top-delegators",
    REGISTRATION: "stake/registration",
  },
};

export const USER_API = {
  ACTIVITY_LOG: "user/activities-log",
  INFO: "user/info",
};

export const EXTEN_API = {
  COINGECKO: {
    PRICE: `${COINGECKO_URL}coins/markets`,
  },
};
