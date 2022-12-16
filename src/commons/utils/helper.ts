import BigNumber from "bignumber.js";
BigNumber.config({ EXPONENTIAL_AT: [-50, 50] });

export const getShortWallet = (address: string) => {
  return `${address.slice(0, 5)}...${address.slice(-5)}`;
};
export const getShortHash = (address: string) => {
  return `${address.slice(0, 10)}...${address.slice(-7)}`;
};

export const getDifferentTime = (after: string | number | Date, before?: string | number | Date) => {
  const first = new Date(after).getTime();
  const last = (before && new Date(before).getTime()) || Date.now() + new Date().getTimezoneOffset() * 60 * 1000;
  const diff = (last - first) / 1000;
  if (diff > 24 * 60 * 60) return `${Math.round(diff / (24 * 60 * 60))} days ago`;
  if (diff > 60 * 60) return `${Math.round(diff / (60 * 60))} hours ago`;
  if (diff > 60) return `${Math.round(diff / 60)} minutes ago`;
  if (diff > 0) return `${Math.round(diff)} seconds ago`;
  return "";
};

export const formatNumber = (value: number | string, decimal: number = 0, decimalSeparator: string = ".") => {
  const arr = `${value}`.split(decimalSeparator);
  if (!decimal) return arr[0];
  if (!arr[1]) arr.push("0");
  return arr[0] + decimalSeparator + arr[1].slice(0, decimal) + "0".repeat(decimal - arr[1].slice(0, decimal).length);
};

export const formatCurrency = (
  value?: string | number,
  decimal: number = 0,
  scale?: number,
  groupSeparator: string = ",",
  decimalSeparator: string = "."
): string => {
  if (!value) return "0";
  const str = value.toString().split("-");
  const valueStr = str[str.length - 1];
  const splittedStrs = valueStr.split(decimalSeparator);
  splittedStrs[0] = new BigNumber(splittedStrs[0]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
  if (scale !== undefined) splittedStrs[1] = splittedStrs[1].toString().slice(0, scale);
  str[str.length - 1] = splittedStrs.join(decimalSeparator);
  return formatNumber(str.join("-"), decimal, decimalSeparator);
};

export const getNumberFromCurrency = (value?: string | number, groupSeparator: string = ","): string => {
  if (!value) return "0";
  const str = value.toString();
  return str.replace(new RegExp(groupSeparator, "g"), "");
};

export const LARGE_NUMBER_ABBREVIATIONS = ["", "K", "M", "B", "t", "q", "Q", "s", "S"];

export const formatPrice = (value?: string | number, abbreviations: string[] = LARGE_NUMBER_ABBREVIATIONS): string => {
  if (!value) return `0${abbreviations[0]}`;
  const bigValue = new BigNumber(value.toString());
  const length = bigValue.toFixed(0).toString().length;
  const exponential = Math.floor((length - 1) / 3) * 3;
  const newValue = bigValue
    .div(10 ** exponential)
    .toString()
    .match(/^-?\d+(?:\.\d{0,2})?/);
  const syntax = abbreviations[exponential / 3];
  return `${newValue && newValue[0]}${syntax ?? `x 10^${exponential}`}`;
};

export const numberWithCommas = (x: number | string) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

export const formatADA = (value?: string | number, abbreviations: string[] = LARGE_NUMBER_ABBREVIATIONS): string => {
  if (!value) return `0${abbreviations[0]}`;
  const Ada = +value / 1000000;
  if (Ada > 1000000000) {
    const bigValue = new BigNumber(Ada.toString());
    const length = Ada.toFixed().toString().length;
    const exponential = Math.floor((length - 1) / 3) * 3;

    if (exponential > 5) {
      const newValue = bigValue
        .div(10 ** exponential)
        .toString()
        .match(/^-?\d+(?:\.\d{0,2})?/);
      const syntax = abbreviations[exponential / 3];

      return `${newValue && newValue[0]}${syntax ?? `x 10^${exponential}`}`;
    }
  }

  const formated = Ada.toString().match(/^-?\d+(?:\.\d{0,5})?/);
  return numberWithCommas(formated ? formated[0] : "0");
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
