import { getShortWallet, formatAmount, numberWithCommas, toFixedBigNumber } from "./helper";

describe("helper getShortWallet", () => {
  it("get short return correct value", () => {
    expect(getShortWallet("0x30e2FaB96CA1DDB8C81d15e1Db79418ffc98F2bc")).toBe("0x30e...8F2bc");
  });
  it("get short return correct length", () => {
    expect(getShortWallet("0x30e2FaB96CA1DDB8C81d15e1Db79418ffc98F2bc")).toHaveLength(13);
  });
  it("get short return wrong value", () => {
    expect(getShortWallet("0x30e2FaB96CA1DDB8C81d15e1Db79418ffc98F2bc")).not.toBe("0x30e");
  });
});

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

test("toFixedBigNumber", () => {
  expect(toFixedBigNumber(1.221, 2)).toEqual(1.22);
  expect(toFixedBigNumber(1.225, 2)).toEqual(1.22);
  expect(toFixedBigNumber(1, 2)).toEqual(1);
});
