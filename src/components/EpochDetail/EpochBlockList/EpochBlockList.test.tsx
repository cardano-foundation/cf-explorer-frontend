import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";

import EpochBlockList from "./index";

jest.mock("src/commons/hooks/useFetchList");

const mockedData = [
  {
    blockNo: 8904653,
    epochNo: 417,
    epochSlotNo: 431977,
    hash: "d7640c234c32dbfbe5a69c8e78728121a7a4f28469a9f94e78ff26ec0f096fe1",
    slotLeader: "a503e42a2c6ef347d834fa404fa4d4bfa6dfb48256ff95b067483980",
    slotNo: 95212777,
    time: "2023/06/14 21:44:28",
    totalFees: 10775536,
    totalOutput: 27326434270526,
    txCount: 29
  }
];
describe("EpochBlockList component", () => {
  it("should render component on PC", () => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: mockedData
    });
    render(<EpochBlockList epochId="417" />);
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Block No")).toBeInTheDocument();
    expect(screen.getByText("Block ID")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: mockedData[0].hash })).toBeInTheDocument();
    expect(screen.getByText("Output")).toBeInTheDocument();
  });

  it("should component render the empty table", () => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: [],
      error: true
    });
    render(<EpochBlockList epochId="417" />);
    expect(screen.getByAltText("no data")).toBeInTheDocument();
  });
});
