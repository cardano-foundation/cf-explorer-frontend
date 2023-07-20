import { useTheme } from "@mui/material";

import { fireEvent, render, screen } from "src/test-utils";
import themes from "src/themes";
import { useScreen } from "src/commons/hooks/useScreen";

import ParseScriptModal from ".";

const scriptObject = {
  message: "Hello, world!",
  count: 5,
  data: [1, 2, 3, 4, 5]
};

const mockProps = {
  open: true,
  onClose: jest.fn(),
  script: JSON.stringify(scriptObject),
  title: "Parse Script",
  subTitle: "Enter your script below:"
};

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

jest.mock("src/commons/hooks/useScreen");
jest.mock("@textea/json-viewer");
describe("ParseScriptModal component", () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(themes["light"]);
    (useScreen as jest.Mock).mockReturnValue({
      isMobile: true,
      isTablet: true
    });
  });
  it("should component render", () => {
    render(<ParseScriptModal {...mockProps} />);
    expect(screen.getByText(/parse script/i)).toBeInTheDocument();
    expect(screen.getByText(/enter your script below:/i)).toBeInTheDocument();
  });

  it("should modal closed", () => {
    render(<ParseScriptModal {...mockProps} />);
    fireEvent.click(screen.getByRole("button", { name: /icon close/i }));
    expect(mockProps.onClose).toBeCalled();
  });
});
