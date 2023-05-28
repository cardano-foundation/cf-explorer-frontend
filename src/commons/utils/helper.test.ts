import { getShortWallet, formatAmount } from "./helper";

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
});
