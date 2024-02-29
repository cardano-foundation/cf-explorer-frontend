import BigNumber from "bignumber.js";
import jwtDecode from "jwt-decode";
import { isNil } from "lodash";
import moment, { DurationInputArg1, DurationInputArg2 } from "moment";
import { parse } from "qs";
import { AxisInterval } from "recharts/types/util/types";
import { createDecipheriv, pbkdf2Sync } from "crypto";
import { ParsedUrlQuery } from "querystring";

import { setUserData } from "src/stores/user";
import breakpoints from "src/themes/breakpoints";

import { APP_LANGUAGES, MAX_SLOT_EPOCH, NETWORK, NETWORKS, NETWORK_TYPES, OPTIONS_CHART_ANALYTICS } from "./constants";
import { getInfo, signIn } from "./userRequest";
BigNumber.config({ EXPONENTIAL_AT: [-50, 50] });

export const alphaNumeric = /[^0-9a-zA-Z]/;

// eslint-disable-next-line no-useless-escape
export const regexEmail = /^[\w\.\+\-]+@([\w-]+\.)+[\w-]{2,4}$/;

export const getShortHash = (address = "", firstpart?: number, lastPart?: number) => {
  if (address?.length <= 18) return address;
  return address
    ? `${address.slice(0, firstpart ? firstpart : 10)}...${address.slice(-(lastPart ? lastPart : 8))}`
    : "";
};

export const getShortHashXs = (address = "", firstpart?: number, lastPart?: number) => {
  if (address?.length <= 18) return address;
  return address ? `${address.slice(0, firstpart ? firstpart : 7)}...${address.slice(-(lastPart ? lastPart : 5))}` : "";
};

export const LARGE_NUMBER_ABBREVIATIONS = ["", "K", "M", "B", "T", "q", "Q", "s", "S"];

export const formatPrice = (value?: string | number, abbreviations: string[] = LARGE_NUMBER_ABBREVIATIONS): string => {
  if (!value) return `0${abbreviations[0]}`;
  const bigValue = new BigNumber(value);
  const length = bigValue.toFixed(0).length;
  const exponential = Math.floor((length - 1) / 3) * 3;
  const newValue = bigValue
    .div(10 ** exponential)
    .toString()
    .match(/^-?\d+(?:\.\d{0,2})?/);
  const syntax = abbreviations[exponential / 3];
  return `${newValue && newValue[0]}${syntax ?? `x 10^${exponential}`}`;
};

export const numberWithCommas = (value?: number | string, decimal = 6) => {
  if (!value) return "0";
  const bnValue = new BigNumber(value);
  const [integerPart, decimalPart] = bnValue.toFixed(decimal, BigNumber.ROUND_DOWN).split(".");

  const formattedIntegerPart = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

  if (decimalPart) {
    const formattedDecimalPart = decimalPart.replace(/0+$/, "");
    if (formattedDecimalPart !== "") {
      return `${formattedIntegerPart}.${formattedDecimalPart}`;
    }
  }
  return formattedIntegerPart;
};

export const formatADA = (
  value?: string | number,
  abbreviations: string[] = LARGE_NUMBER_ABBREVIATIONS,
  numOfUnits = 6
): string => {
  if (!value) return `0${abbreviations[0]}`;
  const realAda = new BigNumber(value).div(10 ** 6);
  if (realAda.gte(10 ** numOfUnits)) {
    const length = realAda.toFixed(0).length;
    const exponential = Math.floor((length - 1) / 3) * 3;

    if (exponential > numOfUnits - 1) {
      const newValue = realAda
        .div(10 ** exponential)
        .toFixed(2, 3)
        .toString();
      const syntax = abbreviations[exponential / 3];

      return `${newValue}${syntax ?? `x 10^${exponential}`}`;
    }
  }
  return numberWithCommas(realAda.toString(), 6);
};

export const formatADAFull = (value?: string | number, limit = 6): string => {
  if (!value) return `0`;
  const realAda = new BigNumber(value).div(10 ** 6);
  return numberWithCommas(realAda.toFixed(limit).toString(), limit);
};

export const formatNumberDivByDecimals = (value?: string | number | BigNumber, decimals = 6) => {
  if (!value) return `0`;
  return numberWithCommas(new BigNumber(value).div(new BigNumber(10).exponentiatedBy(decimals)).toString(), decimals);
};

export const formatNumberTotalSupply = (value?: number | string, decimals = 6) => {
  if (!value) return "0";
  const bnValue = new BigNumber(value).div(new BigNumber(10).exponentiatedBy(decimals));
  const [integerPart, decimalPart] = bnValue.toFixed(decimals, BigNumber.ROUND_DOWN).split(".");

  const formattedIntegerPart = integerPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  if (decimalPart) {
    return `${formattedIntegerPart}.${decimalPart}`;
  }
  return formattedIntegerPart;
};

export const exchangeADAToUSD = (value: number | string, rate: number, isFull?: boolean) => {
  if (!value) return 0;
  const realAda = new BigNumber(value);
  const exchangedValue = realAda.multipliedBy(rate).toString();

  if (isFull) return formatADAFull(exchangedValue);

  return formatADA(exchangedValue);
};

export const handleClicktWithoutAnchor = (e: React.MouseEvent, fn: (e: React.MouseEvent) => void): void => {
  let parent: Element | null = e.target as Element;
  while (parent !== null && parent?.tagName !== "A" && parent?.tagName !== "BUTTON") {
    parent = parent?.parentElement;
  }
  if (parent) {
    return;
  }
  fn(e);
};

export const isExternalLink = (href?: string) => {
  try {
    const url = new URL(href || "");
    return !!url;
  } catch {
    return false;
  }
};

export const formatPercent = (percent?: number) => `${Math.round((percent || 0) * 100 * 100) / 100}%`;

export function getPageInfo<T = ParsedUrlQuery>(
  search: string
): T & { page: number; size: number; sort: string; retired: string } {
  const query = parse(search.split("?")[1]);
  const page = Number(query.page) > 0 ? Number(query.page) - 1 : 0;
  const size = Number(query.size) > 0 ? Number(query.size) : 50;
  const sort = (query.sort || "") as string;
  const retired = query.retired as string;
  return { ...query, retired, page, size, sort } as T & { page: number; size: number; sort: string; retired: string };
}

export const removeAuthInfo = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("walletId");
  localStorage.removeItem("email");
  localStorage.removeItem("loginType");
  localStorage.removeItem("persist:user");
  localStorage.setItem("cf-wallet-connected", "false");
  localStorage.removeItem("cf-last-connected-wallet");
  setUserData(null);
};

export const handleSignIn = async (username: string, password: string, cbSuccess?: () => void) => {
  try {
    const payload = {
      username,
      password,
      type: 0
    };
    const response = await signIn(payload);
    const data = response.data;

    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("walletId", data.address);
    localStorage.setItem("email", data.email);
    localStorage.setItem("login-type", "normal");

    const userInfo = await getInfo({ network: NETWORK_TYPES[NETWORK] });
    setUserData({ ...userInfo.data, loginType: "normal" });
    cbSuccess?.();
  } catch (error) {
    removeAuthInfo();
  }
};

export const formatDateTime = (date: string) => {
  return moment(date).format("MM/DD/YYYY HH:mm:ss");
};
export const formatDateTimeLocal = (date: string) => {
  return moment(moment(`${date} GMT+0000`).local(true)).format("MM/DD/YYYY HH:mm:ss");
};

export const getEpochSlotNo = (data: IDataEpoch) => {
  if (data.status === "FINISHED") {
    return MAX_SLOT_EPOCH;
  }
  return moment().diff(moment(data.startTime).toISOString(), "seconds");
};

export const truncateCustom = (text: string, first = 4, last = 8) => {
  return `${text.slice(0, first)}...${text.slice(-last)}`;
};

export const formatAmount = (amount: number | string, decimal = 0) => {
  if (!amount) return "0";
  return new BigNumber(amount).div(10 ** decimal).toFormat();
};

export const formatBlockHashById = (hash: string): string => {
  if (hash?.length <= 20) return hash;
  return `${hash.slice(0, 20)}...`;
};

export const tokenRegistry = (policy?: string, name?: string): string => {
  switch (NETWORK) {
    case NETWORKS.mainnet:
      return `https://raw.githubusercontent.com/cardano-foundation/cardano-token-registry/master/mappings/${policy}${name}.json`;
    default:
      return `https://raw.githubusercontent.com/input-output-hk/metadata-registry-testnet/master/registry/${policy}${name}.json`;
  }
};

export const cleanObject = (obj: { [key: string]: string | number | Date | string[] | boolean | undefined }) => {
  const cleaned: Partial<typeof obj> = {};
  Object.keys(obj).forEach((key) => obj[key] !== undefined && (cleaned[key] = obj[key]));
  return cleaned;
};

export const getHostname = (url: string): string => {
  let hostname = "";
  try {
    hostname = new URL(url).hostname;
  } catch (error) {
    // Todo: handle error
  }
  return hostname;
};

export const toFixedBigNumber = (value: string | number, dp = 0, rm = BigNumber.ROUND_DOWN): number => {
  return +new BigNumber(value).toFixed(dp, rm);
};

export const isValidEmail = (email: string) => regexEmail.test(email);

export function validateTokenExpired() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;
    const decoded = jwtDecode<{ name: string; exp: number }>(token);
    const now = moment();
    const exp = moment(decoded?.exp * 1000);
    return now.isBefore(exp);
  } catch (e) {
    removeAuthInfo();
  }
}

export const isJson = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getDurationUnits = (inp: DurationInputArg1, unit: DurationInputArg2) => {
  const duration = moment.duration(inp, unit);
  const d = duration.days();
  const h = duration.hours();

  let humanized = "";
  if (d > 1) {
    humanized += `${d} days`;
  } else if (d === 1) {
    humanized = "1 day";
  }

  if (h > 1) {
    humanized += ` ${h} hours`;
  } else if (h === 1) {
    humanized += " 1 hour";
  }

  return {
    d,
    h,
    humanized
  };
};

type blockEpochNoType = number | null | undefined;

export const handleChangeLanguage = (newLang: APP_LANGUAGES, currentLanguage: APP_LANGUAGES | undefined) => {
  moment.locale(newLang);
  const pattern = /^\/([a-z]{2})\//;
  if (currentLanguage) {
    window.location.pathname = window.location.pathname.replace(pattern, `/${newLang}/`);
  } else {
    window.location.pathname = `/${newLang}${window.location.pathname}`;
  }
};

export const formatNameBlockNo = (blockNo: blockEpochNoType, epochNo: blockEpochNoType) => {
  if (isNil(blockNo) && isNil(epochNo))
    return {
      blockName: "Genesis",
      tooltip: ""
    };
  if (isNil(blockNo) && !isNil(epochNo)) {
    return {
      blockName: "N/A",
      tooltip: "Epoch Boundary Block"
    };
  }
  return {
    blockName: blockNo,
    tooltip: ""
  };
};

export const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getIntervalAnalyticChart = (rangeTime: OPTIONS_CHART_ANALYTICS): AxisInterval => {
  const width = window.innerWidth;
  switch (rangeTime) {
    case OPTIONS_CHART_ANALYTICS.ONE_DAY:
      if (width < breakpoints.values.sm) {
        return 2;
      }
      return 0;
    case OPTIONS_CHART_ANALYTICS.ONE_WEEK:
      return 0;
    case OPTIONS_CHART_ANALYTICS.ONE_MONTH:
      if (width < breakpoints.values.sm) {
        return 4;
      }
      if (width < breakpoints.values.laptop) {
        return 3;
      }
      return "preserveStart";
    case OPTIONS_CHART_ANALYTICS.THREE_MONTH:
      if (width < breakpoints.values.sm) {
        return 18;
      }
      return 7;
    default:
      return "preserveEnd";
  }
};

export const isAssetId = (text: string) => {
  if (text.startsWith("asset") && text.length === 44) return true;
  return false;
};

export const removeDuplicate = <T>(arr: T[]) => {
  return arr.filter((c, index) => arr.indexOf(c) === index);
};

function calc_KeyIV(passphrase: string, salt: string) {
  //passphrase as utf8 string, salt as hexstring
  const key_IV = pbkdf2Sync(Buffer.from(passphrase, "utf8"), Buffer.from(salt, "hex"), 10000, 48, "sha256").toString(
    "hex"
  );
  return key_IV; //hex-string
}

export function decryptCardanoMessage(encrypted_msg: string, passphrase = "cardano") {
  const encrypted_hex = Buffer.from(encrypted_msg, "base64").toString("hex");
  const salt = encrypted_hex.substring(16, 32);
  const cyphertext = encrypted_hex.substring(32);

  const keyIV = calc_KeyIV(passphrase, salt);
  const key = keyIV.substring(0, 64);
  const iv = keyIV.substring(64);

  try {
    const decipher = createDecipheriv("aes-256-cbc", Buffer.from(key, "hex"), Buffer.from(iv, "hex"));
    const decr_msg = decipher.update(cyphertext, "hex").toString("utf8") + decipher.final("utf8");
    return decr_msg || ""; //utf8
  } catch (error) {
    throw new Error("Invalid passphrase");
  }
}
