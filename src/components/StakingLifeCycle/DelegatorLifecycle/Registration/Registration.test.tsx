import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import Registration, { RegistrationCertificateModal } from "./index";

jest.mock("src/commons/hooks/useFetch");

describe("Registration", () => {
  beforeEach(() => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false
    });
  });
  it("should component renders", () => {
    render(<Registration />);
    expect(screen.getByText(/registration list/i)).toBeInTheDocument();
    expect(screen.getByText(/showing 0 result/i)).toBeInTheDocument();
  });
});

describe("RegistrationCertificateModal", () => {
  beforeEach(() => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false
    });
  });
  it("should component renders", () => {
    const onClose = jest.fn();
    render(<RegistrationCertificateModal handleCloseModal={onClose} open={true} stake="stake123" />);
    expect(screen.getByText(/registration certificate/i)).toBeInTheDocument();
  });

  it("should component render with data", () => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: {},
      loading: false
    });
    const onClose = jest.fn();
    const { getByText } = render(
      <RegistrationCertificateModal handleCloseModal={onClose} open={true} stake="stake123" />
    );
    expect(getByText("stake123")).toBeInTheDocument();
  });

  it("should component close button was clicked", () => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: {},
      loading: false
    });
    const onClose = jest.fn();
    const { getByTestId } = render(
      <RegistrationCertificateModal handleCloseModal={onClose} open={true} stake="stake123" />
    );
    userEvent.click(getByTestId("close-modal-button"));
    expect(onClose).toBeCalled();
  });
});
