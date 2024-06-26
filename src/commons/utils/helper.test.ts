import { formatAmount, numberWithCommas, toFixedBigNumber, isExternalLink } from "./helper";

describe("helper formatAmountToken", () => {
  it("should remove many zero number in decimal", () => {
    expect(formatAmount(1234)).toEqual("1,234");
    expect(formatAmount(1234000)).toEqual("1,234,000");
  });
  it("if decimal not equal 0, return number ", () => {
    expect(formatAmount(1234, 5)).toEqual("0.01234");
  });
  it("should not add trailing zero in interger number", () => {
    expect(formatAmount(1234, 5)).not.toEqual("0.12345");
  });
  it("should divided by decimal", () => {
    expect(formatAmount(1234000000, 5)).toEqual("12,340");
    expect(formatAmount(1234000000, 5)).toEqual("12,340");
  });
  it("should return correct value with decimal", () => {
    expect(numberWithCommas(1234)).toEqual("1,234");
    expect(numberWithCommas(1.250255985)).toEqual("1.250255");
    // eslint-disable-next-line prettier/prettier
    expect(numberWithCommas(1.25)).toEqual("1.25");
  });
});

describe("helper isExternalLink", () => {
  it("helper isExternalLink test internal link", () => {
    expect(isExternalLink("/")).toBeFalsy();
    expect(isExternalLink("/block")).toBeFalsy();
  });
  it("helper isExternalLink test external link", () => {
    expect(isExternalLink("http://abc.com")).toBeTruthy();
    expect(isExternalLink("https://abc.com.vn")).toBeTruthy();
  });
});

test("toFixedBigNumber", () => {
  expect(toFixedBigNumber(1.221, 2)).toEqual(1.22);
  expect(toFixedBigNumber(1.225, 2)).toEqual(1.22);
  expect(toFixedBigNumber(1, 2)).toEqual(1);
});
