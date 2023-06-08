import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import ScriptTab from "./index";

jest.mock("src/commons/hooks/useFetch", () => ({
  __esModule: true,
  default: () => ({
    data: {
      script: "some script content"
    }
  })
}));

describe("ScriptTab component", () => {
  it("renders the script content", () => {
    render(<ScriptTab />);

    expect(screen.getByText("Contract")).toBeInTheDocument();
    expect(screen.getByText("Script Type:")).toBeInTheDocument();
    expect(screen.getByText("Native Script")).toBeInTheDocument();
    expect(screen.getByText(/some script content/)).toBeInTheDocument();
  });
});
