import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import TabAssociated from "./TabAssociated";

const data = {
  associatedAddresses: [
    "addr1zyjcvd06unjyycfcvmgr547f5qr39lmfn92aekjpvc6jy4j75jq4yvpskgayj55xegdp30g5rfynax66r8vgn9fldnds6zyf84"
  ],
  scriptHash: "258635fae4e442613866d03a57c9a00712ff699955dcda4166352256",
  scriptType: "PLUTUSV2"
};

describe("ContractTabs", () => {
  it("should render component", () => {
    render(<TabAssociated data={data} loading={false} />);
    expect(screen.getAllByText(/Associated Addresses/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Associated Addresses/)[0]).toBeInTheDocument();
  });
});
