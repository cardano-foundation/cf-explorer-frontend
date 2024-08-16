import { expect, Page } from "@playwright/test";

import { DataTabAddADABalance, DataTabAmountStake } from "playwright/api/dtos/topADAHolders.dto";

export function topADAHoldersPage(page: Page) {
  const topADAHoldersTab = page.getByTestId("submenu-button-top_ada_holders");
  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const detailTitle = page.getByTestId("address-detail-title");
  const detailTitleAddressDetail = page.getByTestId("detail.page.title");
  const tabAmountStaked = page.getByTestId("topAddresses.amount-staked");

  //get element in tab Address ADA Holder
  const firstAddressTable = page.getByTestId("topAddresses.byADABalance.addressValue#0");
  const firstBalaceTable = page.getByTestId("topAddresses.byADABalance.balance#0");
  const firstTxCountTable = page.getByTestId("topAddresses.byADABalance.transactionCountValue#0");

  //get element in tab Amount Stake
  const firstAddressStakedTable = page.getByTestId("topAddresses.byAmountStaked.addressValue#0");
  const firstStakeAmountTable = page.getByTestId("topAddresses.byAmountStake.stakeAmount0");

  //title tab Address ADA Holder
  const topADAHoldersAddress = page.getByTestId("topAddresses.byADABalance.addressTitle");
  const topADAHoldersBalance = page.getByTestId("topAddresses.byADABalance.balanceTitle");
  const topADAHoldersCount = page.getByTestId("topAddresses.byADABalance.transactionCountTitle");

  //title tab Amount Stake
  const topADAHoldersAmountAddress = page.getByTestId("topAddresses.byAmountStake.stakeAddressTitle");
  const topADAHoldersPool = page.getByTestId("topAddresses.byAmountStake.poolTitle");
  const topADAHoldersStakeAmount = page.getByTestId("topAddresses.byAmountStake.stakeAmountTitle");

  const checkTitleTableTabAddADABalance = async () => {
    await expect(topADAHoldersAddress, "Check title on top ADA holder table tab address ADA Balance").toHaveText(
      "Addresses"
    );
    await expect(topADAHoldersBalance, "Check title on top ADA holder table tab address ADA Balance").toHaveText(
      "Balance"
    );
    await expect(topADAHoldersCount, "Check title on top ADA holder table tab address ADA Balance").toHaveText(
      "Transaction Count"
    );
  };

  const checkTitleTableTabAmountStake = async () => {
    await expect(topADAHoldersAmountAddress, "Check title on top ADA holder table tab amount staked").toHaveText(
      "Stake Address"
    );
    await expect(topADAHoldersPool, "Check title on top ADA holder table tab amount staked").toHaveText("Pool");
    await expect(topADAHoldersStakeAmount, "Check title on top ADA holder table tab amount staked").toHaveText(
      "Stake Amount"
    );
  };

  const goToDashboard = async () => {
    await page.goto("/");
  };

  const goToTopADAHolders = async () => {
    await page.goto("/addresses");
  };

  const goToTopADAHoldersFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await topADAHoldersTab.click();
  };

  const goToTabAmountStaked = async () => {
    await tabAmountStaked.click();
  };

  // get field address, balance and transaction count in tab Address ADA Balance
  const getAttributeAddress = async () => {
    const ariaLabelValue = await firstAddressTable?.getAttribute("aria-label");
    return ariaLabelValue;
  };

  const getAttributeBalance = async () => {
    const balance = await firstBalaceTable?.getAttribute("aria-label");
    return Number(balance);
  };

  const getAttributeTxCount = async () => {
    const txCount = await firstTxCountTable?.getAttribute("aria-label");
    return Number(txCount);
  };

  // get field stake address, stake smount

  const getAttributeAddressStake = async () => {
    const ariaLabelValueStaked = await firstAddressStakedTable?.getAttribute("aria-label");
    return ariaLabelValueStaked;
  };

  const getAttributeAmountStake = async () => {
    const ariaLabelValueStaked = await firstStakeAmountTable?.getAttribute("aria-label");
    return Number(ariaLabelValueStaked);
  };

  const checkAddressAndBalace = async ({ dataTabAddADABalance }: DataTabAddADABalance) => {
    expect(await Number(getAttributeAddress()), "Address on explorer equal epoch no Koios").toEqual(
      Number(dataTabAddADABalance?.address)
    );
    expect(await getAttributeBalance(), "Balace on explorer equal epoch no Koios").toEqual(
      Number(dataTabAddADABalance?.balance)
    );
  };

  const checkTxCount = async (txCount: number) => {
    expect(await getAttributeTxCount(), "Tx count on explorer equal epoch no Blockfrost").toBeLessThanOrEqual(txCount);
  };

  const checkStakeAddressAndStakeAmount = async ({ dataTabAmountStake }: DataTabAmountStake) => {
    expect(await Number(getAttributeAddressStake()), "Stake address on explorer equal epoch no Blockfrost").toEqual(
      Number(dataTabAmountStake?.stakeAddress)
    );
    expect(await getAttributeAmountStake(), "Stake amount on explorer equal epoch no Blockfrost").toEqual(
      Number(dataTabAmountStake?.stakeAmount)
    );
  };

  const checkAddressDetailPage = async ({ firstAddressValue = "" }: { firstAddressValue: string | null }) => {
    expect(page.url().includes(`/address/${firstAddressValue}`)).toBe(true);
    await expect(detailTitle).toHaveText("Address Details");
  };

  const checkAddressStakeDetailPage = async ({ firstStakeAddress = "" }: { firstStakeAddress: string | null }) => {
    expect(page.url().includes(`/stake-address/${firstStakeAddress}`)).toBe(true);
    await expect(detailTitleAddressDetail).toHaveText("Stake Address Details");
  };

  const checkPoolDetailPage = async ({ firstPoolID = "" }: { firstPoolID: string | null }) => {
    expect(page.url().includes(`/pool/${firstPoolID}`)).toBe(true);
  };

  return {
    goToDashboard,
    goToTopADAHolders,
    goToTopADAHoldersFromSidebar,
    goToTabAmountStaked,
    getAttributeAddress,
    checkTitleTableTabAddADABalance,
    checkTitleTableTabAmountStake,
    checkAddressAndBalace,
    checkTxCount,
    getAttributeAddressStake,
    checkStakeAddressAndStakeAmount,
    checkAddressDetailPage,
    checkAddressStakeDetailPage,
    checkPoolDetailPage
  };
}
