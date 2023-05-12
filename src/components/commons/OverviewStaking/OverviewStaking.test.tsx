import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import OverviewStaking from ".";
import { formatADAFull, getShortHash } from "../../../commons/utils/helper";
import moment from "moment";
import { ThemeProvider } from "@mui/material";
import themes from "../../../themes";

const item: RegistrationItem = {
  txHash: "f0cc0767ea4cf06ce45a85db8f17f930576af1b06f327b8d9d5d25c17f962166",
  fee: 1,
  deposit: 1,
  time: "2023-05-10T10:29:04.308Z",
};

describe("overview staking", () => {
  test("Render hash", async () => {
    render(
      <ThemeProvider theme={themes.light}>
        <OverviewStaking hash={item.txHash} amount={item.deposit} time={item.time} item={item} onClick={() => null} />
      </ThemeProvider>
    );
    const element = screen.getByTestId("overview-staking-hash");
    expect(element.textContent).not.toEqual(item.txHash);
    expect(element.textContent).toEqual(getShortHash(item.txHash));
  });

  test("Render amount", async () => {
    render(
      <ThemeProvider theme={themes.light}>
        <OverviewStaking hash={item.txHash} amount={item.deposit} time={item.time} item={item} onClick={() => null} />
      </ThemeProvider>
    );
    const element = screen.getByTestId("overview-staking-amount");
    expect(element.textContent).toEqual(formatADAFull(item.deposit));
  });

  test("Render time", async () => {
    render(
      <ThemeProvider theme={themes.light}>
        <OverviewStaking hash={item.txHash} amount={item.deposit} time={item.time} item={item} onClick={() => null} />
      </ThemeProvider>
    );
    const element = screen.getByTestId("overview-staking-time");
    expect(element.textContent).toEqual(moment(item.time).format("MM/DD/YYYY HH:mm:ss"));
  });

  test("function click button overview staking", async () => {
    const mockCallfn = jest.fn();
    render(
      <ThemeProvider theme={themes.light}>
        <OverviewStaking hash={item.txHash} amount={item.deposit} time={item.time} item={item} onClick={mockCallfn} />
      </ThemeProvider>
    );
    const elm = screen.getByTestId("overview-staking")
    await userEvent.click(elm);
    expect(mockCallfn).toHaveBeenCalled();
  });
});
