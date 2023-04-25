export const routers = {
  HOME: "/",
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
  STAKE_LIST: "/stakes/:poolType?",
  STAKE_DETAIL: "/stake/:stakeId/:tabActive?",
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
  SPO_SEARCH: "/spo-lifecycle",
  DELEGATOR_SEARCH: "/delegator-lifecycle",
  DELEGATOR_LIFECYCLE: "/delegator-lifecycle/:stakeId/:tab?",
  SPO_LIFECYCLE: "/spo-lifecycle/:poolId",
  NOT_FOUND: "/*",
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
  staking: (stakeId: string, tab = "registration") =>
    routers.DELEGATOR_LIFECYCLE.replace(":stakeId", stakeId).replace(":tab?", tab),
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
  routers.TOP_DELEGATOR,
];
