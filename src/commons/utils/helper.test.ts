import { getShortWallet } from "./helper";

describe("helper getShortWallet", () => {
  it("get short return correct value", () => {
    expect(getShortWallet("0x30e2FaB96CA1DDB8C81d15e1Db79418ffc98F2bc")).toBe("0x30e...8F2bc");
  });
  it("get short return correct length", () => {
    expect(getShortWallet("0x30e2FaB96CA1DDB8C81d15e1Db79418ffc98F2bc")).toHaveLength(13)
  });
  it("get short return wrong value", () => {
    expect(getShortWallet("0x30e2FaB96CA1DDB8C81d15e1Db79418ffc98F2bc")).not.toBe("0x30e");
  });
});
