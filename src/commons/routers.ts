export const routers = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  VERIFY_EMAIL: "/verify-email",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  BLOCK_LIST: "/blocks",
  BLOCK_DETAIL: "/block/:blockId",
  TRANSACTION_LIST: "/transactions",
  TRANSACTION_DETAIL: "/transaction/:trxHash/:tabActive?",
  EPOCH_LIST: "/epochs",
  EPOCH_DETAIL: "/epoch/:epochId",
  DELEGATION_POOLS: "/delegation-pools",
  DELEGATION_POOL_DETAIL: "/delegation-pool/:poolId",
  REGISTRATION_POOLS: "/registration-pools/:poolType?",
  STORY_LIST: "/stories",
  STORY_DETAIL: "/story/:storyId",
  ADDRESS_LIST: "/addresses",
  ADDRESS_DETAIL: "/address/:address",
  TOKEN_LIST: "/tokens",
  TOKEN_DETAIL: "/token/:tokenId/:tabActive?",
  STAKE_LIST: "/stake-keys/:poolType?",
  STAKE_DELEGATIONS: "/stake-delegations",
  INSTANTANEOUS_REWARDS: "/instantaneous-rewards",
  STAKE_DETAIL: "/stake-key/:stakeId/:tabActive?",
  CONTRACT_LIST: "/contracts",
  CONTRACT_DETAIL: "/contracts/:address/:tabActive?",
  NFT_LIST: "/nfts",
  POLICY_DETAIL: "/policy/:policyId",
  NFT_DETAIL: "/nft/:nftId",
  TOP_DELEGATOR: "/top-delegator",
  SEARCH: "/search",
  ACCOUNT: "/account",
  MY_PROFILE: "/account/profile",
  BOOKMARK: "/account/bookmark",
  PRIVATE_NOTES: "/account/notes",
  PROTOCOL_PARAMETER: "/protocol-parameters",
  DELEGATOR_LIFECYCLE: "/delegator-lifecycle/:stakeId/:mode?/:tab?/:txHash?",
  SPO_LIFECYCLE: "/spo-lifecycle/:poolId/:mode?/:tab?/:txHash?",
  STAKING_LIFECYCLE: "/staking-lifecycle/:tab",
  REPORT_GENERATED: "/report-generated/:tab",
  REPORT_GENERATED_STAKING_DETAIL: "/report-generated/:reportId/staking",
  REPORT_GENERATED_POOL_DETAIL: "/report-generated/:reportId/pool",
  POLICY: "/policy",
  FAQ: "/faq",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
  NOT_FOUND: "/*"
} as const;

export const details = {
  block: (blockId?: number | string) => routers.BLOCK_DETAIL.replace(":blockId", `${blockId ?? ""}`),
  transaction: (trxHash?: string, tab = "summary") =>
    routers.TRANSACTION_DETAIL.replace(":trxHash", trxHash ?? "").replace(":tabActive?", tab),
  epoch: (epochId?: number | string) => routers.EPOCH_DETAIL.replace(":epochId", `${epochId ?? ""}`),
  delegation: (poolId?: number | string) => routers.DELEGATION_POOL_DETAIL.replace(":poolId", `${poolId}` ?? ""),
  story: (storyId?: string) => routers.STORY_DETAIL.replace(":storyId", storyId ?? ""),
  address: (address?: string) => routers.ADDRESS_DETAIL.replace(":address", address ?? ""),
  token: (tokenId?: string, tab = "transactions") =>
    routers.TOKEN_DETAIL.replace(":tokenId", tokenId ?? "").replace(":tabActive?", tab),
  stake: (stakeId?: string, tab = "delegation") =>
    routers.STAKE_DETAIL.replace(":stakeId", stakeId ?? "").replace(":tabActive?", tab),
  nft: (nftId?: string) => routers.NFT_DETAIL.replace(":nftId", nftId ?? ""),
  policyDetail: (policyId?: string) => routers.POLICY_DETAIL.replace(":policyId", policyId ?? ""),
  contract: (address?: string, tab = "transaction") =>
    routers.CONTRACT_DETAIL.replace(":address", address ?? "").replace(":tabActive?", tab),
  staking: (stakeId: string, mode: ViewMode = "timeline", tab: DelegationStep = "registration", txHash?: string) =>
    routers.DELEGATOR_LIFECYCLE.replace(":stakeId", stakeId)
      .replace(":mode?", mode)
      .replace(":tab?", tab)
      .replace(":txHash?", txHash ?? ""),
  spo: (poolId: string, mode: ViewMode = "timeline", tab: SPOStep = "registration", txHash?: string) =>
    routers.SPO_LIFECYCLE.replace(":poolId", poolId)
      .replace(":mode?", mode)
      .replace(":tab?", tab)
      .replace(":txHash?", txHash ?? ""),
  generated_staking_detail: (reportId: string) =>
    routers.REPORT_GENERATED_STAKING_DETAIL.replace(":reportId", reportId),
  generated_pool_detail: (reportId: string) => routers.REPORT_GENERATED_POOL_DETAIL.replace(":reportId", reportId),
  generated_report: (tab: string) => routers.REPORT_GENERATED.replace(":tab", tab),
  dashboard: (tab: string) => routers.STAKING_LIFECYCLE.replace(":tab", tab)
};

export const listRouters = [
  routers.BLOCK_LIST,
  routers.TRANSACTION_LIST,
  routers.EPOCH_LIST,
  routers.DELEGATION_POOLS,
  routers.REGISTRATION_POOLS.replace("/:poolType?", ""),
  routers.ADDRESS_LIST,
  routers.TOKEN_LIST,
  routers.STAKE_LIST.replace("/:poolType?", ""),
  routers.CONTRACT_LIST,
  routers.NFT_LIST,
  routers.TOP_DELEGATOR
];
