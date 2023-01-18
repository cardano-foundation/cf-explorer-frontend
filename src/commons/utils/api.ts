import { COINGECKO_URL } from "./constants";

export const API = {
  ADDRESS: {
    ANALYTICS: (address: string, type: string) => `address/analytics/${address}/${type}`,
    DETAIL: (id: string) => `address/${id}`,
    MIN_MAX_BALANCE: (address: string) => `address/min-max-balance/${address}`,
    TOP_ADDRESS: "address/top-addresses",
    TRANSACTION: (id: string) => `address/${id}/txs`,
  },
  BLOCK: {
    DETAIL: (id: string) => `block/${id}`,
    LIST: "block/list",
  },
  CONTRACT: {
    LIST: "contracts",
  },
  DELEGATION: {
    HEADER: "delegation/header",
    POOL_DETAIL_ANALYTIC: "delegation/pool-detail-analytics",
    POOL_DETAIL_DELEGATOR: "delegation/pool-detail-delegators",
    POOL_DETAIL_EPOCH: "delegation/pool-detail-epochs",
    POOL_DETAIL_HEADER: (id: string) => `delegation/pool-detail-header/${id}`,
    POOL_LIST: "delegation/pool-list",
    TOP: "delegation/top",
  },
  EPOCH: {
    CURRENT_EPOCH: "epoch/current",
    DETAIL: (epochId: string) => `epoch/${epochId}`,
    LIST: "epoch/list",
  },
  POLICY: {
    DETAIL: (id: string) => `policy/${id}`,
    TOKENS: (id: string) => `policy/${id}/tokens`,
    HOLDERS: (id: string) => `policy/${id}/holders`,
  },
  POOL: {
    REGISTRATION: "pool/registration",
    DE_REGISTRAION: "pool/de-registration",
  },
  TOKEN: {
    DETAIL: (id: string) => `tokens/${id}`,
    LIST: "tokens",
    MINT: (id: string) => `tokens/${id}/mints`,
    TOP_HOLDER: (id: string) => `tokens/${id}/top_holders`,
    TRANSACTION: (id: string) => `tokens/${id}/txs`,
  },
  TRANSACTION: {
    CURRENT: "tx/current",
    DETAIL: (hash: string) => `tx/${hash}`,
    LIST: "tx/list",
    GRAPH: "tx/graph",
  },
  STAKE: {
    ADDRESS_DETAIL: (id: string) => `stake/address/${id}`,
    ADDRESS_LIST: (id: string) => `stake/${id}/list-address`,
    ANALYTICS: "stake/analytics",
    DELEGATION_HISTORY: (id: string) => `stake/${id}/delegation-history`,
    DETAIL: (id: string) => `stake/${id}`,
    DE_REGISTRATION: "stake/de-registration",
    INSTANTANEOUS_REWARDS: (id: string) => `stake/${id}/instantaneous-rewards`,
    TOP_DELEGATOR: "stake/top-delegators",
    REGISTRATION: "stake/registration",
    STAKE_HISTORY: (id: string) => `stake/${id}/stake-history`,
    WITHDRAWAL_HISTORY: (id: string) => `stake/${id}/withdrawal-history`,
  },
};

export const USER_API = {
  ACTIVITY_LOG: "user/activities-log",
  INFO: "user/info",
};

export const EXTEN_API = {
  COINGECKO: {
    PRICE: (currency: string, id: string) => `${COINGECKO_URL}coins/markets?vs_currency=${currency}&ids=${id}`,
  },
};
