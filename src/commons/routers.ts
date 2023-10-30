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
  DELEGATION_POOLS: "/pools",
  DELEGATION_POOL_DETAIL: "/pool/:poolId",
  POOL_CERTIFICATE: "/pool-certificates",
  POOL_DEREGISTRATION: "/pool-de-registrations",
  STORY_LIST: "/stories",
  STORY_DETAIL: "/story/:storyId",
  ADDRESS_LIST: "/addresses",
  ADDRESS_DETAIL: "/address/:address",
  TOKEN_LIST: "/tokens",
  TOKEN_DETAIL: "/token/:tokenId/:tabActive?",
  STAKE_ADDRESS_REGISTRATION: "/stake-address-registrations",
  STAKE_ADDRESS_DEREGISTRATION: "/stake-address-de-registrations",
  STAKE_ADDRESS_DELEGATIONS: "/stake-address-delegations",
  INSTANTANEOUS_REWARDS: "/instantaneous-rewards",
  STAKE_DETAIL: "/stake-address/:stakeId/:tabActive?",
  CONTRACT_LIST: "/contracts",
  CONTRACT_DETAIL: "/contracts/:address/:tabActive?",
  SMART_CONTRACT: "/smart-contract/:address/:tabActive?",
  NATIVE_SCRIPTS_AND_SC: "/native-scripts-sc/:tabActive?",
  POLICY_DETAIL: "/policy/:policyId",
  NFT_DETAIL: "/nft/:nftId",
  TOP_DELEGATOR: "/top-delegator",
  SEARCH: "/search",
  ACCOUNT: "/account",
  MY_PROFILE: "/account/profile",
  BOOKMARK: "/account/bookmark",
  PRIVATE_NOTES: "/account/notes",
  PROTOCOL_PARAMETER: "/protocol-parameters/:histories?",
  STAKING_LIFECYCLE: "/staking-lifecycle/:tab?",
  DELEGATOR_LIFECYCLE: "/staking-lifecycle/delegator/:stakeId/:mode?/:tab?/:txHash?",
  SPO_LIFECYCLE: "/staking-lifecycle/spo/:poolId/:mode?/:tab?/:txHash?",
  REPORT_GENERATED_STAKING_DETAIL: "/staking-lifecycle/staking-report-generated/:reportId",
  REPORT_GENERATED_POOL_DETAIL: "/staking-lifecycle/pool-report-generated/:reportId",
  POLICY: "/privacy-policy",
  FAQ: "/faq",
  TERMS_OF_SERVICE: "/terms-of-service",
  NOT_FOUND: "/*"
} as const;

export const lists = {
  dashboard: (tab?: LifecycleReportType) => routers.STAKING_LIFECYCLE.replace(":tab?", tab || ""),
  protocolParameters: (histories?: "histories") => routers.PROTOCOL_PARAMETER.replace(":histories?", histories || "")
};

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
  smartContract: (address?: string, tab = "associated") =>
    routers.SMART_CONTRACT.replace(":address", address ?? "").replace(":tabActive?", tab),
  nativeScriptsAndSC: (tab = "native-scripts") => routers.NATIVE_SCRIPTS_AND_SC.replace(":tabActive?", tab),
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
  generated_pool_detail: (reportId: string) => routers.REPORT_GENERATED_POOL_DETAIL.replace(":reportId", reportId)
};

export const listRouters = [
  routers.BLOCK_LIST,
  routers.TRANSACTION_LIST,
  routers.EPOCH_LIST,
  routers.DELEGATION_POOLS,
  routers.POOL_CERTIFICATE,
  routers.POOL_DEREGISTRATION,
  routers.ADDRESS_LIST,
  routers.TOKEN_LIST,
  routers.STAKE_ADDRESS_REGISTRATION,
  routers.STAKE_ADDRESS_DEREGISTRATION,
  routers.STAKE_ADDRESS_DELEGATIONS,
  routers.CONTRACT_LIST,
  routers.TOP_DELEGATOR
];
