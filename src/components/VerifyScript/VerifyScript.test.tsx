import { fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VerifyScript, { IVerifyScript } from "./index";
import { render } from "src/test-utils";

const mockRefresh = jest.fn();

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

const defaultProps: IVerifyScript = {
  verified: false,
  refresh: mockRefresh
};

describe("VerifyScript", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the VerifyScript component", () => {
    const { getByText } = render(<VerifyScript {...defaultProps} />);
    expect(getByText("Contract Detail")).toBeInTheDocument();
    expect(getByText("VERIFY SCRIPT")).toBeInTheDocument();
  });

  it("opens the modal and submits the form", async () => {
    const { getByText } = render(<VerifyScript {...defaultProps} />);
    const verifyButton = getByText("VERIFY SCRIPT");
    fireEvent.click(verifyButton);

    const submitButton = screen.getAllByText("Verify Script")[1] as HTMLAnchorElement;
    const textArea = screen.getByPlaceholderText("Input Native script") as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: "this is mock script" } });

    fireEvent.click(submitButton);

    await waitFor(() => expect(mockRefresh).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Success! Contract has been verified successfully.")).toBeInTheDocument();
  });
});
