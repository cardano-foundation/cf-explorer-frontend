import { screen } from "@testing-library/react";

import useFetch from "src/commons/hooks/useFetch";
import { render } from "src/test-utils";
import PolicyDetail from "src/pages/PolicyDetail";

jest.mock("src/commons/hooks/useFetch");

const mockUseFetch = useFetch as jest.Mock;

const mockData = {
  policyId: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235"
} as PolicyDetail;

describe("PolicyDetail", () => {
  it("testing component redering", () => {
    mockUseFetch.mockReturnValue({
      data: mockData,
      loading: false,
      initialized: true
    });
    render(<PolicyDetail />);
    expect(screen.getByText(/a00/)).toBeInTheDocument();
  });

  it("testing compoment no data <NoRecord>", () => {
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      initialized: true,
      error: true
    });
    render(<PolicyDetail />);
    expect(screen.queryByText(mockData.policyId)).not.toBeInTheDocument();
    expect(screen.getByAltText("empty icon")).toBeInTheDocument();
  });
});
