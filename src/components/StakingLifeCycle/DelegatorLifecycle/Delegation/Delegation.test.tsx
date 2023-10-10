import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { getShortHash } from "src/commons/utils/helper";

import Delegation, { DelegationCertificateModal } from "./index";

jest.mock("src/commons/hooks/useFetch");

const stakeId = "stake1u96el9cyxhwd7s7f7qmculdpp44f5mjrsvh9vh9nrlhdjlsgvfap6";

describe("Delegation", () => {
  beforeEach(() => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false
    });
  });
  it("render Delegation", () => {
    render(<Delegation />);
    expect(screen.getByText(/Recent Delegations/i)).toBeInTheDocument();
    expect(screen.getByText(/showing 0 result/i)).toBeInTheDocument();
  });
});

describe("DelegationCertificateModal", () => {
  beforeEach(() => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false
    });
  });
  it("render DelegationCertificateModal", () => {
    const onClose = jest.fn();
    render(<DelegationCertificateModal handleCloseModal={onClose} open stake={stakeId} txHash="" />);
    expect(screen.getByText(/delegation certificate/i)).toBeInTheDocument();
  });

  it("render DelegationCertificateModal with data", () => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: {},
      loading: false
    });
    const onClose = jest.fn();
    const { getByText } = render(
      <DelegationCertificateModal handleCloseModal={onClose} open stake={stakeId} txHash="" />
    );
    expect(getByText(getShortHash(stakeId))).toBeInTheDocument();
  });

  it("render DelegationCertificateModal close button was clicked", () => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: {},
      loading: false
    });
    const onClose = jest.fn();
    const { getByTestId } = render(
      <DelegationCertificateModal handleCloseModal={onClose} open stake={stakeId} txHash="" />
    );
    userEvent.click(getByTestId("close-modal-button"));
    expect(onClose).toBeCalled();
  });
});
