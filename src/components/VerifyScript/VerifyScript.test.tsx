import { fireEvent, screen, waitFor } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";
import { render } from "src/test-utils";

import VerifyScript, { IVerifyScript } from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    address: "testAddress"
  })
}));

jest.mock("src/commons/utils/axios", () => ({
  defaultAxios: {
    post: () => {
      return Promise.resolve({ data: true });
    }
  }
}));

const defaultProps: IVerifyScript = {};

describe("VerifyScript", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the VerifyScript component", () => {
    const { getByText } = render(<VerifyScript {...defaultProps} />);
    expect(getByText("Contract Details")).toBeInTheDocument();
    expect(getByText(/VERIFY SCRIPT/i)).toBeInTheDocument();
  });

  it("opens the modal and submits the form", async () => {
    const { getByText } = render(<VerifyScript {...defaultProps} />);
    const verifyButton = getByText(/VERIFY SCRIPT/i);
    fireEvent.click(verifyButton);

    const submitButton = screen.getAllByText(/Verify Script/i)[1] as HTMLAnchorElement;
    const textArea = screen.getByPlaceholderText("Input Native script") as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: "this is mock script" } });

    fireEvent.click(submitButton);
    waitFor(() => {
      expect(screen.getByText("Success! Contract has been verified successfully.")).toBeInTheDocument();
    });
  });
});
