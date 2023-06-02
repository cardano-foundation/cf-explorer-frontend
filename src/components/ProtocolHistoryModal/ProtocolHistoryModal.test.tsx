import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import ProtocolHistoryModal from ".";

test("Check Test Protocol HistoryModal call mock api", async () => {
  const handleCloseModal = jest.fn();
  render(<ProtocolHistoryModal protocolType="MIN_FEE_A" open={true} handleCloseModal={handleCloseModal} />);
  expect(screen.getByText("Protocol Parameter Change")).toBeInTheDocument();
});
