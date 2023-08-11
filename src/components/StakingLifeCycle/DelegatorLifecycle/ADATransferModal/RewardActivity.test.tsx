import { render } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import RewardActivity from "./RewardActivity";

const mockedData = [{ amount: 2977300, epochNo: 417, time: "2023/06/09 21:47:26", type: "REWARD_RECEIVED" }];

jest.mock("src/commons/hooks/useFetchList", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({ total: 0, data: [] })
}));

describe("RewardActivity component", () => {
  it("rendering RewardActivity component without data", () => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({ data: [], total: 0, totalPage: 0 });
    const { getByAltText } = render(<RewardActivity />);
    expect(getByAltText("empty icon")).toBeInTheDocument();
  });

  it("rendering component with data", () => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({ data: mockedData, total: 1, totalPage: 1 });
    const { getByText } = render(<RewardActivity />);
    expect(getByText(/2.9773/i)).toBeInTheDocument();
    expect(getByText(formatDateTimeLocal(mockedData[0].time))).toBeInTheDocument();
    expect(getByText("417")).toBeInTheDocument();
  });
});
