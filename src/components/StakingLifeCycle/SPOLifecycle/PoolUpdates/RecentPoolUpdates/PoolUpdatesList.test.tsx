import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import PoollUpdatesList from ".";

describe("Pool Updates", () => {
  it("should render SPO PoollUpdatesList coponents", async () => {
    const setSelected = jest.fn();
    jest.spyOn(Router, "useParams").mockReturnValue({ useParams: "1" });
    render(<PoollUpdatesList onSelect={setSelected} setShowBackButton={jest.fn()} />);
    expect(screen.getByText("Recent Updates")).toBeInTheDocument();
  });

  it("should render SPO table has 0 data", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ useParams: "1" });
    jest.mock("module", () => ({
      useFetchList: () => {
        return [];
      }
    }));
    render(<PoollUpdatesList onSelect={jest.fn()} setShowBackButton={jest.fn()} />);
    expect(screen.getByText("Recent Updates")).toBeInTheDocument();
    expect(screen.getByText(/showing 0 result/i)).toBeInTheDocument();
  });
});
