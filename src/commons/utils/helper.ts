import BigNumber from "bignumber.js";
import moment from "moment";
import { parse } from "qs";

import { setUserData } from "../../stores/user";
import { getInfo, signIn } from "./userRequest";
import { MAX_SLOT_EPOCH, NETWORK, NETWORK_TYPES } from "./constants";
BigNumber.config({ EXPONENTIAL_AT: [-50, 50] });

export const alphaNumeric = /[^0-9a-zA-Z]/;

// eslint-disable-next-line no-useless-escape
export const regexEmail = /^[\w\.\+\-]+@([\w-]+\.)+[\w-]{2,4}$/;

export const getShortWallet = (address = "") => {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};

export const getShortHash = (address = "") => {
  return `${address.slice(0, 10)}...${address.slice(-7)}`;
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
  return numberWithCommas(new BigNumber(value).div(new BigNumber(10).exponentiatedBy(decimals)).toString());
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

export const isExtenalLink = (href?: string) => href && (href.search("http://") >= 0 || href.search("https://") >= 0);
export const formatPercent = (percent?: number) => `${Math.round((percent || 0) * 100 * 100) / 100}%`;

export const getPageInfo = (search: string): { page: number; size: number } => {
  const query = parse(search.split("?")[1]);
  const page = Number(query.page) > 0 ? Number(query.page) - 1 : 0;
  const size = Number(query.size) > 0 ? Number(query.size) : 50;
  return { page, size };
};

export const removeAuthInfo = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("walletId");
  localStorage.removeItem("email");
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

export const tokenRegistry = (policy: string | undefined, name: string | undefined) => {
  const tokenRegitryLink = `https://raw.githubusercontent.com/cardano-foundation/cardano-token-registry/master/mappings/${policy}${name}.json`;
  return tokenRegitryLink;
};

export const cleanObject = (obj: { [key: string]: string | number | Date | string[] | undefined }) => {
  const cleaned: Partial<typeof obj> = {};
  Object.keys(obj).forEach((key) => obj[key] !== undefined && (cleaned[key] = obj[key]));
  return cleaned;
};

export const toFixedBigNumber = (value: string | number, dp = 0, rm = BigNumber.ROUND_DOWN): number => {
  return +new BigNumber(value).toFixed(dp, rm);
};
