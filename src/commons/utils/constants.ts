import { get } from "lodash";

import { Wallet } from "../../types/user";
import { EternlIcon, FlintIcon, NamiIcon, TyphonIcon, YoroiIcon } from "../resources";
export const STORAGE_KEYS = {
  THEME: "dark",
  USER_INFO: "user_info",
  NETWORK: "network"
};

export enum NETWORKS {
  mainnet = "mainnet",
  preprod = "preprod",
  preview = "preview",
  testnet = "testnet"
}

export const SUPPORTED_WALLETS: Wallet[] = [
  {
    name: "Flint",
    icon: FlintIcon,
    link: "https://chrome.google.com/webstore/detail/flint-wallet/hnhobjmcibchnmglfbldbfabcgaknlkj",
    networks: [NETWORKS.mainnet]
  },
  {
    name: "Nami",
    icon: NamiIcon,
    link: "https://chrome.google.com/webstore/detail/nami/lpfcbjknijpeeillifnkikgncikgfhdo",
    networks: [NETWORKS.mainnet, NETWORKS.preprod, NETWORKS.preview, NETWORKS.testnet]
  },
  {
    name: "Eternl",
    icon: EternlIcon,
    link: "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    networks: [NETWORKS.mainnet, NETWORKS.preprod, NETWORKS.preview, NETWORKS.testnet]
  },
  {
    name: "Yoroi",
    icon: YoroiIcon,
    link: "https://chrome.google.com/webstore/detail/yoroi/ffnbelfdoeiohenkjibnmadjiehjhajb",
    networks: [NETWORKS.mainnet]
  },
  {
    name: "Yoroi",
    icon: YoroiIcon,
    link: "https://chrome.google.com/webstore/detail/yoroi-nightly/poonlenmfdfbjfeeballhiibknlknepo",
    networks: [NETWORKS.testnet, NETWORKS.preprod]
  },
  {
    name: "Typhon",
    icon: TyphonIcon,
    link: "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    networks: [NETWORKS.mainnet, NETWORKS.preprod, NETWORKS.preview, NETWORKS.testnet]
  }
];

export enum EPOCH_STATUS {
  FINISHED = "Finished",
  REWARDING = "Rewarding",
  IN_PROGRESS = "In Progress",
  SYNCING = "Syncing"
}

export const MAX_SLOT_EPOCH = 432000;

export enum NETWORK_NAMES {
  mainnet = "Mainnet",
  preprod = "Preprod",
  preview = "Preview",
  testnet = "Testnet"
}

export enum NETWORK_TYPES {
  mainnet = "MAIN_NET",
  preprod = "PRE_PROD",
  preview = "PREVIEW",
  testnet = "TEST_NET"
}
export const FRONT_END_NETWORK = {
  mainnet: process.env.REACT_APP_MAINNET_APP_URL || get(window, "env.REACT_APP_MAINNET_APP_URL"),
  preprod: process.env.REACT_APP_PREPROD_APP_URL || get(window, "env.REACT_APP_PREPROD_APP_URL"),
  preview: process.env.REACT_APP_PREVIEW_APP_URL || get(window, "env.REACT_APP_PREVIEW_APP_URL"),
  testnet: process.env.REACT_APP_TESTNET_APP_URL || get(window, "env.REACT_APP_TESTNET_APP_URL")
};

export const NETWORK: NETWORKS =
  (process.env.REACT_APP_NETWORK as NETWORKS) || get(window, "env.REACT_APP_NETWORK") || NETWORKS.mainnet;

export enum TRANSACTION_STATUS {
  FAIL = "FAIL",
  SUCCESS = "SUCCESS",
  PENDDING = "PENDDING"
}
export enum CONFIRMATION_STATUS {
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  HIGH = "HIGH"
}

export enum STAKE_KEY_STATUS {
  ACTIVE = "ACTIVE",
  DEACTIVATED = "DEACTIVATED"
}

export enum RECEIVED_REWARDS {
  LEADER = "LEADER",
  MEMBER = "MEMBER",
  ALL = ""
}
export const APP_VERSION = process.env.REACT_APP_VERSION || get(window, "env.REACT_APP_VERSION") || "1.0.0";
export const EXT_ADA_PRICE_URL =
  process.env.REACT_APP_EXT_ADA_PRICE_URL || get(window, "env.REACT_APP_EXT_ADA_PRICE_URL");
export const TESTNET_API_URL = process.env.REACT_APP_TESTNET_API_URL || get(window, "env.REACT_APP_TESTNET_API_URL");
export const PREVIEW_API_URL = process.env.REACT_APP_PREVIEW_API_URL || get(window, "env.REACT_APP_PREVIEW_API_URL");
export const PREPROD_API_URL = process.env.REACT_APP_PREPROD_API_URL || get(window, "env.REACT_APP_PREPROD_API_URL");
export const MAINNET_API_URL = process.env.REACT_APP_MAINNET_API_URL || get(window, "env.REACT_APP_MAINNET_API_URL");

export const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL || get(window, "env.REACT_APP_AUTH_API_URL");
export const API_URL = process.env.REACT_APP_API_URL || get(window, "env.REACT_APP_API_URL");

export enum ACCOUNT_ERROR {
  UNKNOWN_ERROR = "CC_1",
  INVALID_TOKEN = "CC_2",
  TOKEN_EXPIRED = "CC_3",
  REFRESH_TOKEN_EXPIRED = "CC_4",
  SIGNATURE_INVALID = "CC_5",
  USER_IS_NOT_EXIST = "CC_6",
  NONCE_EXPIRED = "CC_7",
  ROLE_IS_NOT_FOUND = "CC_8",
  REFRESH_TOKEN_IS_NOT_EXIST = "CC_9",
  TOKEN_INVALID_SIGNATURE = "CC_10",
  TOKEN_UNSUPPORTED = "CC_11",
  TOKEN_IS_NOT_EMPTY = "CC_12",
  PARAM_IS_NOT_NULL = "CC_13",
  LIMIT_BOOKMARK_IS_2000 = "CC_14",
  LIMIT_NOTE_IS_2000 = "CC_15",
  BOOKMARK_IS_EXIST = "CC_16",
  PRIVATE_NOTE_IS_EXIST = "CC_17",
  WALLET_IS_NOT_EXIST = "CC_18",
  USERNAME_IS_ALREADY_EXIST = "CC_19",
  WALLET_IS_ALREADY_EXIST = "CC_20",
  INVALID_VERIFY_CODE = "CC_21",
  VERIFY_CODE_NOT_PENDING = "CC_22",
  EMAIL_IS_ALREADY_EXIST = "CC_23",
  USERNAME_OR_PASSWORD_INVALID = "CC_24"
}

// unit second
export enum REFRESH_TIMES {
  CURRENT_PRICE_USD = 20,
  CURRENT_PRICE_BTC = 20,
  CURRENT_EPOCH = 5,
  LATEST_TRANSACTION = 20,
  TOP_DELEGATION_POOLS = 20,
  EPOCH_DETAIL = 20,
  EPOCH_DETAIL_VIEW = 20,
  BLOCK_DETAIL = 20,
  TRANSACTION_DETAIL = 20,
  TOKEN_LIST = 20,
  TOP_ADDRESS = 20,
  CONTRACTS = 20,
  POOLS = 20,
  STAKE_REGISTRATION = 20,
  POOL_REGISTRATIONS = 20,
  TOP_DELEGATORS = 20,
  STAKE_DELEGATIONS = 20,
  INSTANT_REWARDS = 20
}

export const PROTOCOL_TYPE = {
  minFeeA: "MIN_FEE_A",
  minFeeB: "MIN_FEE_B",
  maxBlockSize: "MAX_BLOCK_SIZE",
  maxTxSize: "MAX_TX_SIZE",
  maxBhSize: "MAX_BH_SIZE",
  keyDeposit: "KEY_DEPOSIT",
  poolDeposit: "POOL_DEPOSIT",
  maxEpoch: "MAX_EPOCH",
  optimalPoolCount: "OPTIMAL_POOL_COUNT",
  influence: "INFLUENCE",
  monetaryExpandRate: "MONETARY_EXPAND_RATE",
  treasuryGrowthRate: "TREASURY_GROWTH_RATE",
  decentralisation: "DECENTRALISATION",
  entropy: "ENTROPY",
  protocolMajor: "PROTOCOL_MAJOR",
  protocolMinor: "PROTOCOL_MINOR",
  minUtxoValue: "MIN_UTXO_VALUE",
  minPoolCost: "MIN_POOL_COST",
  costModel: "COST_MODEL",
  priceMem: "PRICE_MEM",
  priceStep: "PRICE_STEP",
  maxTxExMem: "MAX_TX_EX_MEM",
  maxTxExSteps: "MAX_TX_EX_STEPS",
  maxBlockExMem: "MAX_BLOCK_EX_MEM",
  maxBlockExSteps: "MAX_BLOCK_EX_STEPS",
  maxValSize: "MAX_VAL_SIZE",
  collateralPercent: "COLLATERAL_PERCENT",
  maxCollateralInputs: "MAX_COLLATERAL_INPUTS",
  coinsPerUtxoSize: "COINS_PER_UTXO_SIZE"
};
