import { getShortWallet, numberWithCommas } from "./helper";

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

describe("helper numberWithCommas", () => {
  it("should remove many zero number in decimal", () => {
    expect(numberWithCommas(1234, 5)).toEqual("1,234");
    expect(numberWithCommas(1234000, 5)).toEqual("1,234,000");
  });
  it("if decimal not equal 0, return number ", () => {
    expect(numberWithCommas(1234.1234, 3)).toEqual("1,234.123");
  });
  it("should not add trailing zero in interger number", () => {
    expect(numberWithCommas(1, 3)).not.toEqual("1.000");
  });
});
