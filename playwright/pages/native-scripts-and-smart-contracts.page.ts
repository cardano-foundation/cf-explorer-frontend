import { expect, Page } from "@playwright/test";

export function nativeScriptAndSmartContractPage(page: Page) {
  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const nativeAndContractTab = page.getByTestId("submenu-button-native_scripts_&_smart_contracts");
  const nativeAndContractTitle = page.getByTestId("NSSM.title");

  // Native Script Page
  const nativeScriptsTab = page.getByTestId("nativeScriptsTab");
  const scriptHashTitle = page.getByTestId("nativeScripts.card.scriptHashTitle#2");
  const policyTitle = page.getByTestId("nativeScripts.card.policyTitle#0");
  const assetHoldersTitle = page.getByTestId("nativeScripts.card.assetHoldersTitle#0");
  const tokenTitle = page.getByTestId("nativeScripts.card.tokensTitle#0");
  const filterNativeTitle = page.getByTestId("tabNativeScripts.filter");
  const applyFilterBtn = page.getByTestId("tabNativeScripts.filter.applyFilters");
  const timeLockedFilter = page.getByTestId("tabNativeScripts.filter.timeLocked");
  const multiSigFilter = page.getByTestId("tabNativeScripts.filter.multiSig");
  const timeLockedOpenFilter = page.getByTestId("filter.timelocked.open");
  const multiSigYesOption = page.getByTestId("filter.multiSig.yes");
  const policyNativeSctiptValue = page.getByTestId("nativeScripts.card.policyValue#0");

  // Native Script Detail Page
  const nativeScriptTitle = page.getByTestId("ns.title");
  const mintBurnTab = page.getByTestId("ns.mintBurnPolicy");
  const scriptTab = page.getByTestId("ns.script");
  const tokenTab = page.getByTestId("ns.token");
  const associatedAddressesTab = page.getByTestId("ns.AssociatedAddresses");
  const assetHoldersTab = page.getByTestId("ns.assetHolders");

  // Smart Contract Page
  const smartContractTab = page.getByTestId("smartContractTab");
  const filterContractTitle = page.getByTestId("nativeScripts.smartContract.filter");
  const scriptHashContractTitle = page.getByTestId("nativeScripts.smartContract.card.scriptHashTitle#5");
  const versionContractTitle = page.getByTestId("nativeScripts.smartContract.card.versionTitle#2");
  const totalTrxContractTitle = page.getByTestId("nativeScripts.smartContract.card.totalTrxTitle#2");
  const purposeContractTitle = page.getByTestId("nativeScripts.smartContract.card.purposeTitle#2");
  const versionSmartContractFilter = page.getByTestId("nativeScripts.smartContract.filter.version");
  const plutusv2VersionOption = page.getByTestId("nativeScripts.smartContract.filter.plutusv2");
  const applySmartContractFilterBtn = page.getByTestId("nativeScripts.smartContract.filter.applyFilters");
  const versionContractValue = page.getByTestId("nativeScripts.smartContract.card.versionValue");

  // Native Script Detail Page
  const smartContractTitle = page.getByTestId("sc.detail.title");
  const transactionTab = page.getByTestId("sc.transaction");
  const associatedAddressesSCTab = page.getByTestId("sc.AssociatedAddresses");

  const checkNativeScriptTab = async () => {
    expect(nativeAndContractTitle).toContainText("Native Scripts & Smart Contracts");
    expect(nativeScriptsTab).toContainText("Native Scripts");
    expect(scriptHashTitle).toContainText("Script Hash");
    expect(policyTitle).toContainText("Minting / Burning Policy");
    expect(assetHoldersTitle).toContainText("Asset Holders");
    expect(tokenTitle).toContainText("Tokens");
    expect(filterNativeTitle).toContainText("Filter");
  };

  const checkSmartContractTab = async () => {
    expect(nativeAndContractTitle).toContainText("Native Scripts & Smart Contracts");
    expect(smartContractTab).toContainText("Smart Contracts");
    expect(filterContractTitle).toContainText("Filter");
    expect(scriptHashContractTitle).toContainText("Script Hash");
    expect(versionContractTitle).toContainText("Version");
    expect(totalTrxContractTitle).toContainText("Number of Transactions");
    expect(purposeContractTitle).toContainText("Transaction Purpose");
  };

  const checkNativeTimeLockedFilter = async () => {
    setTimeout(async () => {
      expect(policyNativeSctiptValue).toContainText("Open");
    }, 10000);
  };

  const checkNativeMultiSigFilter = async () => {
    setTimeout(async () => {
      expect(policyNativeSctiptValue).toContainText("Multi-Sig");
    }, 10000);
  };

  const checkVersionContractFilter = async () => {
    setTimeout(async () => {
      expect(versionContractValue).toContainText("Plutus V2");
    }, 10000);
  };

  // Todo
  const checkNativeScriptDetail = async () => {
    expect(nativeScriptTitle).toContainText("Native Script Details");
    expect(mintBurnTab).toContainText("Minting / Burning Policy");
    expect(scriptTab).toContainText("Script");
    expect(tokenTab).toContainText("Token");
    expect(assetHoldersTab).toContainText("Asset Holders");
    expect(associatedAddressesTab).toContainText("Associated Addresses");
  };

  // Todo
  const checkSmartContractDetail = async () => {
    expect(smartContractTitle).toContainText("Smart Contract Details");
    expect(transactionTab).toContainText("Transactions");
    expect(associatedAddressesSCTab).toContainText("Associated Addresses");
  };

  const clickNativeCard = async () => {
    scriptHashTitle.click();
  };

  const clickContractCard = async () => {
    scriptHashContractTitle.click();
  };

  const clickNativeDetailTokenTab = async () => {
    tokenTab.click();
  };

  const chooseAssetHolderTab = async () => {
    await assetHoldersTab.click();
  };

  const chooseTransactionTab = async () => {
    await transactionTab.click();
  };

  const chooseTimeLockedFilter = () => {
    timeLockedFilter.click;
    timeLockedOpenFilter.click;
    applyFilterBtn.click;
  };

  const chooseMultiSigFilter = () => {
    multiSigFilter.click;
    multiSigYesOption.click;
    applyFilterBtn.click;
  };

  const chooseVertionFilter = () => {
    versionSmartContractFilter.click;
    plutusv2VersionOption.click;
    applySmartContractFilterBtn.click;
  };

  const openNativeScriptFilter = async () => {
    filterNativeTitle.click;
  };

  const openSmartContractFilter = async () => {
    filterContractTitle.click;
  };

  const goToDashboard = async () => {
    await page.goto("/");
  };

  const goToNativeAndContractFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await nativeAndContractTab.click();
  };

  const goTo = async () => {
    await page.goto("/native-scripts-sc/native-scripts");
  };

  const selectSmartContractTab = async () => {
    await smartContractTab.click();
  };

  return {
    checkNativeScriptTab,
    checkSmartContractTab,
    checkNativeTimeLockedFilter,
    checkVersionContractFilter,
    checkNativeMultiSigFilter,
    checkNativeScriptDetail,
    checkSmartContractDetail,
    chooseTimeLockedFilter,
    chooseMultiSigFilter,
    chooseAssetHolderTab,
    chooseVertionFilter,
    chooseTransactionTab,
    clickNativeCard,
    clickContractCard,
    clickNativeDetailTokenTab,
    goTo,
    goToDashboard,
    goToNativeAndContractFromSidebar,
    selectSmartContractTab,
    openNativeScriptFilter,
    openSmartContractFilter
  };
}
