import { expect, Page } from "@playwright/test";

import { BlockfrostNativeTokenInformationDto } from "playwright/api/dtos/blockfrostNativeTokenInformation.dto";

export function nativeTokenPage(page: Page) {
  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const nativeTokensTab = page.getByTestId("submenu-button-native_tokens");
  const searchBarNativeTokens = page.getByTestId("all-filters-dropdown");
  const deatailPageTitle = page.getByTestId("ns.title");
  const deatailPagesTitle = page.getByTestId("detail.page.title");
  const deatailTopHolderTab = page.getByTestId("token.detail.topHoldersTab");
  const deatailMintingTab = page.getByTestId("token.detail.mintingTab");
  const policyScript = page.getByTestId("token.policyScript");
  const topholderTransactionAddress = page.getByTestId("transaction.topholder.address#1");
  const mintingTrxhashAddress = page.getByTestId("token.detail.minting.trxHash#1");

  //Native Token Table
  const firstAssetNameInTable = page.getByTestId("token.assetName#1");
  const firstScriptHashInTable = page.getByTestId("token.scriptHash#1");
  const tokenTableVolume24hValue = page.getByTestId("tokens.table.value.volume24h#1");
  const tokenTableIcon = page.getByTestId("tokens.table.title.icon");
  const tokenTableAssetName = page.getByTestId("tokens.table.title.assetName");
  const tokenTableScriptHash = page.getByTestId("tokens.table.title.scriptHash");
  const tokenTableTotalTxs = page.getByTestId("tokens.table.title.totalTxs");
  const tokenTableNumberOfHolders = page.getByTestId("tokens.table.title.numberOfHolders");
  const tokenTableTotalVolumn = page.getByTestId("tokens.table.title.totalVolumn");
  const tokenTableVolume24h = page.getByTestId("tokens.table.title.volume24h");
  const tokenTableTotalSupply = page.getByTestId("tokens.table.title.totalSupply");
  const tokenTabletoCreatedAt = page.getByTestId("tokens.table.title.createdAt");

  //Native Token Widget
  const tokenIDFromWidgetToken = page.getByTestId("token.widget.tokenId");
  const scriptHashFromWidgetToken = page.getByTestId("token.widget.scriptHash");
  const transactionFromWidgetToken = page.getByTestId("token.widget.transactions");
  const assetNameWidget = page.getByTestId("token.widget.assetName");
  const viewDetailBtn = page.getByTestId("token.widget.viewDetail");

  //Native Token detail - Transactions Table
  const tokenTransactionTxhash = page.getByTestId("token.transaction.txHash#0");
  const tokenTransactionBlock = page.getByTestId("token.transaction.block#0");
  const tokenTransactionEpoch = page.getByTestId("token.transaction.epoch#0");
  const tokenTransactionAddress = page.getByTestId("token.transaction.address#0");

  const goToDashboard = async () => {
    await page.goto("/");
  };

  const goToNativeTokenFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await nativeTokensTab.click();
  };

  const goToTokensDetailPageFromTableByAssetName = async () => {
    await firstAssetNameInTable.click();
  };
  const goToTokensDetailPageFromTableByScripthash = async () => {
    await firstScriptHashInTable.click();
  };

  const goToTokenDetailFromWidgetByTokenId = async () => {
    await tokenIDFromWidgetToken.click();
  };
  const goToTokenDetailFromWidgetByTransaction = async () => {
    await transactionFromWidgetToken.click();
  };
  const goToTokenDetailFromWidgetByViewDetailBtn = async () => {
    await viewDetailBtn.click();
  };
  const goToTokenDetailFromWidgetByScriptHash = async () => {
    await scriptHashFromWidgetToken.click();
  };
  const goToTransactionDetailFromTransactionTableByTxHash = async () => {
    await tokenTransactionTxhash.click();
  };
  const goToBlockDetailFromTransactionTableByBlock = async () => {
    await tokenTransactionBlock.click();
  };

  const goToEpochDetailFromTransactionTableByEpoch = async () => {
    await tokenTransactionEpoch.click();
  };
  const goToAddressDetailFromTransactionTableByAddress = async () => {
    await tokenTransactionAddress.click();
  };
  const goToStakeAddressDetailFromTopHolderTableByAddress = async () => {
    await deatailTopHolderTab.click();
    await topholderTransactionAddress.click();
  };

  const goToTransactionDetailFromMintingTableByTxHash = async () => {
    await deatailMintingTab.click();
    await mintingTrxhashAddress.click();
  };

  const goToNativeTokens = async () => {
    await page.goto("/tokens");
  };

  const searchBarOnTokens = async () => {
    await expect(searchBarNativeTokens).toHaveText("Tokens");
  };

  const openWidget = async () => {
    await tokenTableVolume24hValue.click();
  };

  const openPolicyScriptModal = async () => {
    await policyScript.click();
  };

  const getDetailTokenPageTitle = async () => {
    await expect(deatailPageTitle, "Check title on token detail").toHaveText("Native Script Details");
  };

  const getLinkHrefFromWidgetByTokenID = async () => {
    const tokenId = await tokenIDFromWidgetToken?.getAttribute("href");
    return tokenId;
  };
  const getLinkHrefFromWidgetByViewDetailBtn = async () => {
    const tokenId = await viewDetailBtn?.getAttribute("data-policyName");
    return tokenId;
  };
  const getLinkHrefFromWidgetByTransaction = async () => {
    const tokenId = await transactionFromWidgetToken?.getAttribute("href");
    return tokenId;
  };
  const getLinkHrefFromWidgetByScriptHash = async () => {
    const scriptHash = await scriptHashFromWidgetToken?.getAttribute("href");
    return scriptHash;
  };

  const checkNativeTokenTable = async () => {
    await expect(tokenTableIcon, "Check title on transaction table").toHaveText("Icon");
    await expect(tokenTableAssetName, "Check title on transaction table").toHaveText("Asset name");
    await expect(tokenTableScriptHash, "Check title on transaction table").toHaveText("Script hash");
    await expect(tokenTableTotalTxs, "Check title on transaction table").toHaveText("Total Transactions");
    await expect(tokenTableNumberOfHolders, "Check title on transaction table").toHaveText("Number of holders");
    await expect(tokenTableTotalVolumn, "Check title on transaction table").toHaveText("Total volume");
    await expect(tokenTableVolume24h, "Check title on transaction table").toHaveText("Volume 24H");
    await expect(tokenTableTotalSupply, "Check title on transaction table").toHaveText("Total Supply");
    await expect(tokenTabletoCreatedAt, "Check title on transaction table").toHaveText("Created At");
  };

  const checkCurrentTokenWidget = async ({
    currentNativeToken
  }: {
    currentNativeToken?: BlockfrostNativeTokenInformationDto;
  }) => {
    expect(
      await scriptHashFromWidgetToken.getAttribute("aria-label"),
      "Current script hash on explorer equal script hash Blockfrost"
    ).toEqual(currentNativeToken?.policy_id);
    expect(
      await tokenIDFromWidgetToken.getAttribute("aria-label"),
      "Current token id on explorer equal token id Blockfrost"
    ).toEqual(currentNativeToken?.fingerprint);
    expect(await assetNameWidget.textContent(), "Current asset name on explorer equal asset name Blockfrost").toEqual(
      currentNativeToken?.metadata?.name
    );
  };

  const checkCurrentAssetDetail = async ({
    currentNativeToken
  }: {
    currentNativeToken?: BlockfrostNativeTokenInformationDto;
  }) => {
    expect(await deatailPagesTitle.textContent(), "Current asset name on explorer equal asset name Blockfrost").toEqual(
      currentNativeToken?.metadata?.name
    );
  };
  return {
    goToAddressDetailFromTransactionTableByAddress,
    goToStakeAddressDetailFromTopHolderTableByAddress,
    goToTransactionDetailFromMintingTableByTxHash,
    goToTransactionDetailFromTransactionTableByTxHash,
    goToTokensDetailPageFromTableByAssetName,
    goToTokensDetailPageFromTableByScripthash,
    goToNativeTokenFromSidebar,
    goToNativeTokens,
    getDetailTokenPageTitle,
    getLinkHrefFromWidgetByTokenID,
    goToTokenDetailFromWidgetByTokenId,
    getLinkHrefFromWidgetByScriptHash,
    goToTokenDetailFromWidgetByScriptHash,
    goToTokenDetailFromWidgetByTransaction,
    goToDashboard,
    goToBlockDetailFromTransactionTableByBlock,
    goToEpochDetailFromTransactionTableByEpoch,
    goToTokenDetailFromWidgetByViewDetailBtn,
    getLinkHrefFromWidgetByTransaction,
    getLinkHrefFromWidgetByViewDetailBtn,
    checkCurrentTokenWidget,
    checkCurrentAssetDetail,
    openPolicyScriptModal,
    checkNativeTokenTable,
    searchBarOnTokens,
    openWidget
  };
}
