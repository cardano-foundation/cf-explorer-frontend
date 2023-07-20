import { screen } from "@testing-library/react";

import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import ScriptTab from "./index";

jest.mock("src/commons/hooks/useFetch");

describe("ScriptTab component", () => {
  it("renders the script content", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {
        data: JSON.stringify({ token: "ADA" }),
        isVerified: true
      }
    });
    render(<ScriptTab />);
    expect(screen.getByText("Contract")).toBeInTheDocument();
    expect(screen.getByText("Native Script")).toBeInTheDocument();
    expect(screen.getByText(/\{ "token": "ada" \}/i)).toBeInTheDocument();
  });
});
