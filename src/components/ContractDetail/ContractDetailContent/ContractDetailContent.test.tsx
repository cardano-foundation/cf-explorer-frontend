import { render, screen } from "src/test-utils";

import ContractDetailContent from ".";

describe("ContractDetailContent component", () => {
  it("should component render", () => {
    render(<ContractDetailContent />);
    expect(screen.getByRole("tab", { name: /utxoicon\.svg transaction/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /u_book\.svg script/i })).toBeInTheDocument();
  });
});
