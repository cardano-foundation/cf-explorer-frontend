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
  sanchonet = "sanchonet"
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
    networks: [NETWORKS.mainnet, NETWORKS.preprod, NETWORKS.preview]
  },
  {
    name: "Eternl",
    icon: EternlIcon,
    link: "https://chrome.google.com/webstore/detail/eternl/kmhcihpebfmpgmihbkipmjlmmioameka",
    networks: [NETWORKS.mainnet, NETWORKS.preprod, NETWORKS.preview]
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
    networks: [NETWORKS.preprod]
  },
  {
    name: "Typhon",
    icon: TyphonIcon,
    link: "https://chrome.google.com/webstore/detail/typhon-wallet/kfdniefadaanbjodldohaedphafoffoh",
    networks: [NETWORKS.mainnet, NETWORKS.preprod, NETWORKS.preview]
  }
];

export enum EPOCH_STATUS {
  FINISHED = "Finished",
  REWARDING = "Rewarding",
  IN_PROGRESS = "In Progress",
  SYNCING = "Syncing"
}

export const NETWORK_NAMES = JSON.parse(
  String(process.env.REACT_APP_NETWORK_NAMES || get(window, "env.REACT_APP_NETWORK_NAMES") || "{}")
);

export enum NETWORK_TYPES {
  mainnet = "MAIN_NET",
  preprod = "PRE_PROD",
  preview = "PREVIEW",
  sanchonet = "SANCHONET"
}
export const FRONT_END_NETWORK = {
  mainnet: process.env.REACT_APP_MAINNET_APP_URL || get(window, "env.REACT_APP_MAINNET_APP_URL"),
  preprod: process.env.REACT_APP_PREPROD_APP_URL || get(window, "env.REACT_APP_PREPROD_APP_URL"),
  preview: process.env.REACT_APP_PREVIEW_APP_URL || get(window, "env.REACT_APP_PREVIEW_APP_URL"),
  sanchonet: process.env.REACT_APP_SANCHONET_APP_URL || get(window, "env.REACT_APP_SANCHONET_APP_URL")
};

export const NETWORK: NETWORKS =
  (process.env.REACT_APP_NETWORK as NETWORKS) || get(window, "env.REACT_APP_NETWORK") || NETWORKS.mainnet;

export const MAX_SLOT_EPOCH =
  NETWORK?.toLowerCase() === NETWORKS.preview || NETWORK?.toLowerCase() === NETWORKS.sanchonet ? 86400 : 432000;

export enum TRANSACTION_STATUS {
  FAILED = "FAILED",
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

export const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL || get(window, "env.REACT_APP_AUTH_API_URL");
export const API_URL = process.env.REACT_APP_API_URL || get(window, "env.REACT_APP_API_URL");
export const WS_URL = process.env.REACT_APP_WS_URL || get(window, "env.REACT_APP_WS_URL");
export const CARDANO_NEWS_URL = process.env.REACT_APP_CARDANO_NEWS_URL || get(window, "env.REACT_APP_CARDANO_NEWS_URL");
export const APP_VERSION = process.env.REACT_APP_VERSION || get(window, "env.REACT_APP_VERSION");
export const EXT_ADA_PRICE_URL =
  process.env.REACT_APP_EXT_ADA_PRICE_URL || get(window, "env.REACT_APP_EXT_ADA_PRICE_URL");

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
  USERNAME_OR_PASSWORD_INVALID = "CC_24",
  INVALID_PARAM = "400-INVALID_PARAM",
  INTERNAL_ERROR = "INTERNAL-SERVER",
  EPOCH_NOT_FOUND = "404-EPOCH_NOT_FOUND",
  BLOCK_NOT_FOUND = "404-BLOCK_NOT_FOUND",
  TRANSACTION_NOT_FOUND = "404-TRANSACTION_NOT_FOUND",
  ADDRESS_NOT_FOUND = "404-ADDRESS_NOT_FOUND",
  STAKE_ADDRESS_NOT_FOUND = "404-STAKE_ADDRESS_NOT_FOUND",
  TOKEN_NOT_FOUND = "TOKEN_NOT_FOUND",
  POLICY_NOT_FOUND = "404-POLICY_NOT_FOUND",
  STAKE_REGISTRATION_NOT_FOUND = "404-STAKE_REGISTRATION_NOT_FOUND",
  STAKE_DE_REGISTRATION_NOT_FOUND = "404-STAKE_DEREGISTRATION_NOT_FOUND",
  STAKE_DELEGATION_NOT_FOUND = "404-STAKE_DELEGATION_NOT_FOUND",
  STAKE_WITHDRAWAL_NOT_FOUND = "404-STAKE_DELEGATION_NOT_FOUND",
  STAKE_REPORT_HISTORY_NOT_FOUND = "404-STAKE_REPORT_HISTORY_NOT_FOUND",
  REPORT_IS_IN_PROGRESS = "404-REPORT_IS_IN_PROGRESS",
  EXPORT_TYPE_NOT_SUPPORTED = "404-EXPORT_TYPE_NOT_SUPPORTED",
  PROTOCOL_FIELD_NOT_FOUND = "404-PROTOCOL_FIELD_NOT_FOUND",
  SCRIPT_NOT_FOUND = "404-SCRIPT_NOT_FOUND",
  FETCH_REWARD_ERROR = "500-FETCH_REWARD_ERROR",
  TIME_RANGE_ILLEGAL = "400-TIME_RANGE_ILLEGAL",
  REPORT_LIMIT_REACHED = "400-REPORT_LIMIT_REACHED"
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
  coinsPerUTxOByte: "COINS_PER_UTXO_SIZE"
};

export const LANGUAGE = "en";

export enum REWARD_TYPES {
  MEMBER = "MEMBER",
  LEADER = "LEADER",
  REFUND = "REFUND",
  RESERVES = "RESERVES",
  TREASURY = "TREASURY"
}

export const REWARD_TYPES_LABEL = {
  [REWARD_TYPES.MEMBER]: "Delegators",
  [REWARD_TYPES.LEADER]: "Operator",
  [REWARD_TYPES.REFUND]: "Refund",
  [REWARD_TYPES.RESERVES]: "Reserves",
  [REWARD_TYPES.TREASURY]: "Treasury"
};

export enum EVENT_TYPES {
  BLOCK = "BLOCK",
  CURRENT_PRICE_USD = "CURRENT_PRICE_USD",
  CURRENT_PRICE_BTC = "CURRENT_PRICE_BTC",
  CURRENT_EPOCH = "CURRENT_EPOCH"
}

export const HOTJAR_HJID = process.env.REACT_APP_HOTJAR_HJID;
export const HOTJAR_HJSV = process.env.REACT_APP_HOTJAR_HJSV;

export enum APP_LANGUAGES {
  ENGLISH = "en"
}

export const SUPPORTED_LANGUAGES = ["en"];

export enum OPTIONS_CHART_ANALYTICS {
  ONE_DAY = "ONE_DAY",
  ONE_WEEK = "ONE_WEEK",
  ONE_MONTH = "ONE_MONTH",
  THREE_MONTH = "THREE_MONTH"
}

export const ROLE_ELEVATED_GEN_REPORT = -1;
