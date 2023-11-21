import { render, screen } from "src/test-utils";

import CIP25ComplianceModal from "./CIP25ComplianceModal";

const data: Transaction["metadata"][0]["metadataCIP25"]["tokenMap"] = {
  spacecoins: {
    tokenName: "spacecoins",
    requireProperties: [
      {
        index: "1",
        valid: true,
        value: "d894897411707efa755a76deb66d26dfd50593f2e70863e1661e98a0",
        property: "policy_id",
        format: "raw bytes"
      },
      {
        index: "2",
        valid: true,
        value: "spacecoins",
        property: "asset_name",
        format: "string"
      },
      {
        index: "3",
        valid: true,
        value: "spacecoins",
        property: "name",
        format: "string"
      },
      {
        index: "4",
        valid: true,
        value: "ipfs://Qmc44D9d8oaj38TtrXKXPYyWKpyPButDQtA9pVjBtb1qYV",
        property: "image",
        format: "uri"
      }
    ],
    optionalProperties: [
      {
        index: "1",
        valid: true,
        property: "mediaType",
        format: "image/<mime_sub_type>",
        value: ""
      },
      {
        index: "2",
        valid: true,
        value: "your did it!",
        property: "description",
        format: "string"
      },
      {
        index: "3",
        valid: true,
        property: "files",
        format: "array",
        value: ""
      },
      {
        index: "3.1.1",
        valid: true,
        value: "spacecoins whitepaper",
        property: "name",
        format: "string"
      },
      {
        index: "3.1.2",
        valid: true,
        value: "ipfs://QmZWaVnF5m5h9cd2KeMoqm4QAdsM5ZmEBrnfaLtckNUMGP",
        property: "src",
        format: "uri"
      },
      {
        index: "3.1.3",
        valid: true,
        value: "application/pdf",
        property: "mediaType",
        format: "mime_type"
      }
    ]
  }
};

describe("CIP25ComplianceModal", () => {
  it("should component render", () => {
    render(<CIP25ComplianceModal data={data} open={true} onClose={jest.fn()} />);
    expect(screen.getByText(/cip 25 compliance/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp("token: " + data["spacecoins"].tokenName, "i"))).toBeInTheDocument();
    expect(screen.getByText(/required properties/i)).toBeInTheDocument();
    expect(screen.getByText(/other properties/i)).toBeInTheDocument();
  });
});
