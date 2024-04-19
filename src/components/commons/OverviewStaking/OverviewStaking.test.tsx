import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import { render } from "src/test-utils";

import OverviewStaking from ".";

const item: RegistrationItem = {
  txHash: "f0cc0767ea4cf06ce45a85db8f17f930576af1b06f327b8d9d5d25c17f962166",
  fee: 1,
  deposit: 1,
  time: "Fri May 12 2023 11:58:04 GMT+0000"
};

describe("overview staking", () => {
  test("Render hash", async () => {
    render(
      <OverviewStaking hash={item.txHash} amount={item.deposit} time={item.time} item={item} onClick={() => null} />
    );
    const element = screen.getByTestId("overview-staking-hash");
    expect(element.textContent).not.toEqual(item.txHash);
    expect(element.textContent).toEqual(getShortHash(item.txHash));
  });

  test("Render amount", async () => {
    render(
      <OverviewStaking hash={item.txHash} amount={item.deposit} time={item.time} item={item} onClick={() => null} />
    );
    const element = screen.getByTestId("overview-staking-amount");
    expect(element.textContent).toEqual(formatADAFull(item.deposit));
  });

  test("Render time", async () => {
    render(
      <OverviewStaking hash={item.txHash} amount={item.deposit} time={item.time} item={item} onClick={() => null} />
    );
    const element = screen.getByTestId("overview-staking-time");
    expect(element.textContent).toEqual(formatDateTimeLocal(item.time));
  });

  test("function click button overview staking", async () => {
    const mockCallfn = jest.fn();
    render(
      <OverviewStaking hash={item.txHash} amount={item.deposit} time={item.time} item={item} onClick={mockCallfn} />
    );
    const elm = screen.getByTestId("overview-staking");
    await userEvent.click(elm);
    expect(mockCallfn).toHaveBeenCalled();
  });
});
