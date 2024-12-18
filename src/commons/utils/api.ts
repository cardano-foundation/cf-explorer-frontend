import { stringify } from "qs";

export const API = {
  ADDRESS: {
    ANALYTICS: "addresses/analytics",
    DETAIL: "addresses",
    MIN_MAX_BALANCE: "addresses/min-max-balance",
    TOKENS: "addresses/:address/tokens",
    VIEW_ADRRESSES: (txHash: string, scriptHash: string) => `scripts/contract-executions/${txHash}/${scriptHash}`
  },
  BLOCK: {
    DETAIL: "blocks",
    LIST: "blocks"
  },
  CONTRACT: "contracts",
  DELEGATION: {
    HEADER: "delegations/header",
    POOL_ANALYTICS: "delegations/pool-detail-analytics",
    POOL_DETAIL_HEADER: "delegations/pool-detail-header",
    POOL_DETAIL: (tab: "epochs" | "delegators") => `delegations/pool-detail-${tab}`,
    POOL_LIST: "delegations/pool-list",
    TOP: "delegations/top"
  },
  EPOCH: {
    CURRENT_EPOCH: "epochs/current",
    DETAIL: "epochs",
    LIST: "epochs"
  },
  POLICY: "policies",
  SCRIPTS_SEARCH: "scripts/search",
  POOL: "pools",
  POOL_CERTIFICATE: {
    POOL: "gov-actions",
    POOL_CHART: "gov-actions/voting-chart",
    POOL_DETAIL: (poolId: string) => `gov-actions/${poolId}/voting-procedure-detail`
  },
  POOL_CERTIFICATES_HISTORY: "pools/certificates-history",
  POOL_RANGE_VALUES: "pools/range-values-for-filter",
  DREP_RANGE_VALUES: "dreps/range-values-for-filter",
  DREP_CERTIFICATES_HISTORY: "dreps/:drepId/certificates-history",
  DREP_OVERVIEW: "dreps/:drepId/drep-details",
  DREP_OVERVIEW_CHART: "dreps/:drepId/vote-procedure-chart",
  DREP_DELEGATOR: "dreps/:drepId/get-delegation",
  DREPS_LIST: {
    DREPS_LIST: "dreps/filter",
    DREPS_OVERVIEW: "dreps/overview"
  },
  POTS_OVERVIEW: "pots/overview",
  CIRCULATING_SUPPLY: "supply/circulating",
  TOKEN: {
    LIST: "tokens",
    TOKEN_TRX: "tokens/:tokenId/txs",
    ANALYTICS: "tokens/analytics",
    NATIVE_SCRIPT: (scriptHash: string) => "scripts/native-scripts/" + scriptHash,
    VERIFY_SCRIPT: (scriptHash: string) => `scripts/native-scripts/${scriptHash}/verify`,
    TOKENS_SCRIPTED: (scriptHash: string) => `scripts/native-scripts/${scriptHash}/tokens`,
    TOKEN_HOLDERS: (scriptHash: string) => `scripts/native-scripts/${scriptHash}/holders`,
    POLICIES: (scriptHash: string) => `/policies/${scriptHash}`
  },
  TRANSACTION: {
    CURRENT: "txs/current",
    DETAIL: "txs",
    LIST: "txs",
    GRAPH: "txs/graph",
    HASH_CONTRACT: (txHash: string, address: string) => `txs/${txHash}/contract?address=${address}`,
    WINERY_DETAIL: (txHash: string, wineryId: string) => `txs/${txHash}/${wineryId}`,
    CERTIFICATE_DETAIL: (txHash: string, certNo: string) => `txs/${txHash}/certData/${certNo}`
  },
  STAKE: {
    ANALYTICS: "stakes/analytics",
    ANALYTICS_BALANCE: "stakes/analytics-balance",
    ANALYTICS_REWARD: "stakes/analytics-reward",
    DETAIL: "stakes",
    DE_REGISTRATION: "stakes/de-registration",
    TOP_DELEGATOR: "stakes/top-delegators",
    REGISTRATION: "stakes/registration",
    MIN_MAX_BALANCE: "stakes/min-max-balance",
    STAKE_DELEGATIONS: "delegations",
    INSTANT_REWARDS: "instantaneous-rewards",
    REWARDS_DISTRIBUTION: "stakes/reward-distribution"
  },
  STAKE_LIFECYCLE: {
    REGISTRATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/registrations`,
    REGISTRATION_DETAIL: (stakeKey: string, hash: string) => `stake-lifecycle/${stakeKey}/registrations/${hash}`,
    DELEGATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/delegations`,
    DELEGATION_DETAIL: (stakeKey: string, hash: string) => `stake-lifecycle/${stakeKey}/delegations/${hash}`,
    WITHDRAW: (stakeKey: string) => `stake-lifecycle/${stakeKey}/withdrawals`,
    WITHDRAW_DETAIL: (stakeKey: string, hash: string) => `stake-lifecycle/${stakeKey}/withdrawals/${hash}`,
    DEREGISTRATION: (stakeKey: string) => `stake-lifecycle/${stakeKey}/de-registrations`,
    DEREGISTRATION_DETAIL: (stakeKey: string, hash: string) => `stake-lifecycle/${stakeKey}/de-registrations/${hash}`,
    RECEIVED_REWARD: (stakeKey: string) => `stake-lifecycle/${stakeKey}/rewards`,
    WALLET_ACTIVITY: (stakeKey: string) => `stake-lifecycle/${stakeKey}/wallet-activity`,
    REWARDS_ACTIVITY: (stakeKey: string) => `stake-lifecycle/${stakeKey}/reward-activity`,
    TABS: (stakeKey: string) => `stake-lifecycle/${stakeKey}`,
    SEARCH: "search/staking-lifecycle"
  },
  SPO_LIFECYCLE: {
    SPO_REGISTRATION: (poolId: string) => `pool-lifecycle/registration?poolView=${poolId}`,
    SPO_REGISTRATION_LIST: (poolId: string) => `pool-lifecycle/registration-list?poolView=${poolId}`,
    SPO_REGISTRATION_DETAIl: (poolView: string, poolId: number) =>
      `pool-lifecycle/registration-detail?poolView=${poolView}&id=${poolId}`,
    POOL_UPDATE: (poolId: string) => `pool-lifecycle/pool-update?poolView=${poolId}`,
    POOL_UPDATE_LIST: (poolId: string) => `pool-lifecycle/pool-update-list?poolView=${poolId}`,
    POOL_UPDATE_DETAIL: (poolId: number) => `pool-lifecycle/pool-update-detail?id=${poolId}`,
    POOL_INFO: (poolId: string) => `pool-lifecycle/pool-info?poolView=${poolId}`,
    REWARD: (poolId: string) => `pool-lifecycle/reward?poolView=${poolId}`,
    SPO_DEREGISTRATION: (poolId: string) => `pool-lifecycle/de-registration?poolView=${poolId}`,
    SPO_POOL_INFO: (poolId: string) => `pool-lifecycle/pool-info?poolView=${poolId}`,
    SPO_DEREGISTRATION_DETAIl: (poolView: string, poolId: number) =>
      `pool-lifecycle/de-registration-detail?poolView=${poolView}&id=${poolId}`,
    TABS: (poolView: string) => `/pool-lifecycle/status?poolView=${poolView}`
  },
  MARKETS: "markets",
  PROTOCOL_PARAMETER: {
    LASTEST: "protocols/latest",
    HISTORY: "protocols/histories/filter",
    FIXED: "protocols/fixed"
  },
  REPORT: {
    STAKE_KEY_SUMMARY: `staking-lifecycle/report/stake-key/history`,
    DOWNLOAD_STAKE_KEY_SUMMARY: (reportId: number) => `staking-lifecycle/report/stake-key/${reportId}/export`,
    DOWNLOAD_POOL_SUMMARY: (reportId: number) => `pool-report/detail/${reportId}/export`,
    POOL_REPORT_SUMMARY: `pool-report/list`,
    DASHBOARD: `staking-lifecycle/report/dashboard`,
    //report for staking
    STAKING_REPORTED_DETAIL: (reportId: number | string) => `staking-lifecycle/report/stake-key/${reportId}/detail`,
    SREPORT_DETAIL_REGISTRATIONS: (reportId: number | string) =>
      `staking-lifecycle/report/stake-key/${reportId}/registrations`,
    SREPORT_DETAIL_WITHDRAWALS: (reportId: number | string) =>
      `staking-lifecycle/report/stake-key/${reportId}/withdrawals`,
    SREPORT_DETAIL_REWARDS: (reportId: number | string) => `staking-lifecycle/report/stake-key/${reportId}/rewards`,
    SREPORT_DETAIL_DELEGATIONS: (reportId: number | string) =>
      `staking-lifecycle/report/stake-key/${reportId}/delegations`,
    SREPORT_DETAIL_DEGEGISTRATIONS: (reportId: number | string) =>
      `staking-lifecycle/report/stake-key/${reportId}/de-registrations`,
    SREPORT_WALLET_ACTIVITY: (reportId: number | string) =>
      `staking-lifecycle/report/stake-key/${reportId}/wallet-activity`,
    //report for pool
    POOL_REPORTED_DETAIL: (reportId: number | string) => `pool-report/detail/${reportId}`,
    PREPORT_REGISTRATIONS: (reportId: number | string) => `pool-report/detail/${reportId}/pool-registration`,
    PREPORT_PROTOCOL_UPDATE: (reportId: number | string) => `pool-report/detail/${reportId}/pool-update`,
    PREPORT_REWARD_DISTRIBUTIONS: (reportId: number | string) => `pool-report/detail/${reportId}/rewards-distribution`,
    PREPORT_DEREGSITRATION: (reportId: number | string) => `pool-report/detail/${reportId}/deregistration`,
    PREPORT_EPOCH_SIZE: (reportId: number | string) => `pool-report/detail/${reportId}/epoch-size`,
    REPORT_LIMIT: "staking-lifecycle/report/report-limit"
  },
  CONTRACTS: {
    VERIFY_SCRIPT: "contracts/verify/native",
    SCRIPT: (address: string) => `contracts/${address}/script`
  },
  STORIES: (query: { [key: string]: string | number }) => `news?${stringify(query)}`,
  SEARCH_ALL: (query: string) => `/search?${stringify({ query })}`,
  SCRIPTS: {
    SMART_CONTRACTS: "scripts/contracts",
    NATIVE_SCRIPTS: "scripts/native-scripts",
    ASSOCIATED_ADDRESS: (scriptHash: string) => `scripts/contracts/${scriptHash}`,
    SCRIPT_TXS_DETAIL: (scriptHash: string) => `scripts/contracts/${scriptHash}/txs`
  },
  ADAHandle: (name: string) => `/addresses/by-ada-handle/${name}`,
  COMMITTEE: {
    OVERVIEW: "committee/overview",
    DETAIL_OVERVIEW: (hash: string) => `committee/${hash}`,
    MEMBERS: "committee/members",
    HISTORY: "gov-actions/committee-history",
    CC_DETAIL: () => `gov-actions/voting-procedure-detail`,
    CC_DETAIL_CHART: (hash: string) => `committee/${hash}/vote-procedure-chart`
  },
  GOVERNANCE_OVERVIEW: {
    OVERVIEW: "gov-actions/overview",
    TAB: "gov-actions"
  },
  NETWORK_MONITORING_API: {
    REGISTERED_STAKEPOOLS: "pools/stake-pools-chart",
    BLOCK_PROPAGATION: (type: string, size: number) => `blocks/block-propagation?type=${type}&size=${size}`
  },
  OVERVIEW_GOV_ACTIONS: {
    OVERVIEW: (hash: string, index: string) => `/gov-actions/${hash}/${index}`,
    CREATE_BY: (anchorUrl: string, anchorHash: string, page: number, size: number) =>
      `gov-actions/authors?anchorUrl=${anchorUrl}&anchorHash=${anchorHash}&page=${page}&size=${size}`
  },
  GOV_ACTIONS_DETAIL: {
    RANGE_VALUE: "gov-actions/:txHash/:index/votes/range-values"
  },
  EMISSIONS: {
    GRAPH: "txs/graph"
  },
  MICAR: {
    CARBON_EMISSION: "MiCAR/carbon-emission",
    INDICATOR: "/MiCAR/carbon-emission/overview",
    HISTORYCAL: "/MiCAR/carbon-emission/historical"
  },
  BOLNISI: {
    OVERVIEW: "bolnisi/overview"
  }
};

export const USER_API = {
  ACTIVITY_LOG: "user/activities-log",
  INFO: "user/info",
  SET_TIMEZONE: "user/set-timezone",
  BOOKMARK: "bookmark/find-all-key"
};
