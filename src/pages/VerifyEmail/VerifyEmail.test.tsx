import { render, screen, waitFor } from "src/test-utils";
import { authAxios } from "src/commons/utils/axios";

import VerifyEmail from ".";
const code = 123;
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ search: `?code=${code}` })
}));
jest.mock("src/commons/utils/axios", () => ({
  authAxios: {
    get: () => {
      return Promise.resolve({
        data: {
          code: "SS_0"
        }
      });
    }
  }
}));
describe("VerifyEmail page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should component render successfully", async () => {
    render(<VerifyEmail />);
    await waitFor(() => {
      expect(screen.getByText("You have successfully verified the account.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
    });
  });

  it("should component render unsuccessfully", async () => {
    const getMock = jest.spyOn(authAxios, "get");
    getMock.mockRejectedValue({ error: true });
    render(<VerifyEmail />);
    await waitFor(() => {
      expect(screen.getByText("There's been an error in the verify process")).toBeInTheDocument();
      expect(screen.getByText("This URL is either incorrect or has expired.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /go to dashboard/i })).toBeInTheDocument();
    });
  });
});
