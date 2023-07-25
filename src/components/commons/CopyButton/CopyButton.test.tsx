import userEvent from "@testing-library/user-event";
import { useCopyToClipboard } from "react-use";

import { render, screen } from "src/test-utils";

import CopyButton from ".";

jest.mock("react-use", () => ({
  ...jest.requireActual("react-use"),
  useCopyToClipboard: jest.fn()
}));

const copyFn = jest.fn();
const mockData = "FHgsAAsAJTAwsJwrcS0CFl2AKyYu3kj1sYDuDxebw+XxcMAA9KdzgjovQEeBoEA";
describe("BookmarkButton component", () => {
  beforeEach(() => {
    (useCopyToClipboard as jest.Mock).mockReturnValue([null, copyFn]);
  });
  it("should component render", () => {
    render(<CopyButton text={mockData} />);
    const copyButton = screen.getByRole("button", {
      name: /copy/i
    });
    expect(copyButton).toBeInTheDocument();
  });

  it("should copy button click", async () => {
    const onClick = jest.fn();
    render(<CopyButton text={mockData} onClick={onClick} />);
    const copyButton = screen.getByRole("button", {
      name: /copy/i
    });
    await userEvent.click(copyButton);
    expect(onClick).toBeCalled();
    expect(copyFn).toBeCalledWith(mockData);
  });
});
