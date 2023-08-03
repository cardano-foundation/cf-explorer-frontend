import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import Registration, { RegistrationCertificateModal } from "./index";

jest.mock("src/commons/hooks/useFetch");

const stakeId = "stake1u96el9cyxhwd7s7f7qmculdpp44f5mjrsvh9vh9nrlhdjlsgvfap6";

describe("Registration", () => {
  beforeEach(() => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false
    });
  });
  it("render Registration ", () => {
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
  it("render RegistrationCertificateModal", () => {
    const onClose = jest.fn();
    render(<RegistrationCertificateModal handleCloseModal={onClose} open stake={stakeId} />);
    expect(screen.getByText(/registration certificate/i)).toBeInTheDocument();
  });

  it("render RegistrationCertificateModal with data", () => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: {},
      loading: false
    });
    const onClose = jest.fn();
    const { getByText } = render(<RegistrationCertificateModal handleCloseModal={onClose} open stake={stakeId} />);
    expect(getByText(stakeId)).toBeInTheDocument();
  });

  it("render RegistrationCertificateModal close button was clicked", () => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: {},
      loading: false
    });
    const onClose = jest.fn();
    const { getByTestId } = render(<RegistrationCertificateModal handleCloseModal={onClose} open stake={stakeId} />);
    userEvent.click(getByTestId("close-modal-button"));
    expect(onClose).toBeCalled();
  });
});
