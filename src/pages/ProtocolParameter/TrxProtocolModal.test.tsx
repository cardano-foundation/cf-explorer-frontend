import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import TxsProtocolModal from "./TxsProtocolModal";

test("Check Test Trx Protocol Modal", async () => {
  const handleCloseModal = jest.fn();
  render(
    <TxsProtocolModal
      txs={[
        "62c3c13187423c47f629e6187f36fbd61a9ba1d05d101588340cfbfdf47b22d2",
        "a83f479c5635e1e563a19f6e72a1be59fb082bbf31de90cc176850ee799b08ac"
      ]}
      open={true}
      onClose={handleCloseModal}
    />
  );
  expect(screen.getByText("Transactions")).toBeInTheDocument();
  expect(screen.getByText("Confirmed by transactions")).toBeInTheDocument();
});
