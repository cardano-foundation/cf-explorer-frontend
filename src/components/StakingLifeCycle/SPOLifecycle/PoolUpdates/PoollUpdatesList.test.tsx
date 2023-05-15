import { render, screen } from "@testing-library/react";
import { PoollUpdatesList } from ".";

import Router from "react-router";

// jest.mock("../../../../commons/hooks/useFetchList", () => {
//   return {
//     useFetchList: () => {
//       return { total: 1 };
//     },
//   };
// });

describe("Pool Updates", () => {
  it("should render SPO PoollUpdatesList coponents", async () => {
    const setSelected = jest.fn();
    jest.spyOn(Router, "useParams").mockReturnValue({ useParams: "1" });
    render(<PoollUpdatesList onSelect={setSelected} />);
    expect(screen.getByText("Recent Updates")).toBeInTheDocument();
    const elm = screen.getByTestId("showing");
    expect(elm).toHaveTextContent("Showing");
  });

  it("should render SPO table has 0 data", async () => {
    jest.spyOn(Router, "useParams").mockReturnValue({ useParams: "1" });
    jest.mock("module", () => ({
      useFetchList: () => {
        return [];
      }
    }));
    render(<PoollUpdatesList onSelect={jest.fn()} />);
    expect(screen.getByText("Recent Updates")).toBeInTheDocument();

    const elm = screen.getByTestId("showing");
    expect(elm).toHaveTextContent("Showing 0 results");
  });
});
