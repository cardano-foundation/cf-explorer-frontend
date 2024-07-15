import { expect, Page } from "@playwright/test";

export function poolOverviewPage(page: Page) {
  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const poolsTab = page.getByTestId("submenu-button-pools");
  const searchBarPools = page.getByTestId("all-filters-dropdown");
  const epochCardPools = page.getByTestId("delegationOverview.epochCard");
  const poolName = page.getByTestId("poolList.poolNameValue").first();
  const rewardAccountPool = page.getByTestId("poolDetail.rewardAccountValue");
  const ownerAccountPool = page.getByTestId("poolDetail.ownerAccountValue");
  const deatailPageTitle = page.getByTestId("stake-address-detail-title");
  const deatailBlockTitle = page.getByTestId("block.detail.header");
  const deatailPagesTitle = page.getByTestId("detail.page.title");
  const epochValuePools = page.getByTestId("delegationOverview.epochValue");
  const epochValuePoolsList = page.getByTestId("delegationEpochList.epochValue").first();
  const stakingTitlePoolsList = page.getByTestId("delegationDetail.stakingTitle");
  const certificatesHistoryTitlePoolsList = page.getByTestId("delegationDetail.certificatesHistoryTitle");
  const governanceTitle = page.getByTestId("delegationDetail.governanceTitle");
  const governanceFilter = page.getByTestId("governance.filter");
  const governanceApplyFilters = page.getByTestId("governance.applyFilters");
  const delegatorValuePoolsList = page.getByTestId("stakingDelegators.delegatorValue").first();
  const txHashValuePoolsList = page.getByTestId("poolHistory.txHashValue").first();
  const blockValuePoolsList = page.getByTestId("poolHistory.blockValue").first();
  const epochValuePoolsHistory = page.getByTestId("poolHistory.epochValue").first();
  const governanceActionType = page.getByTestId("governance.filter.actionType");
  const governanceCurrentStatus = page.getByTestId("governance.filter.currentStatus");
  const governanceActionTypeText = page.getByTestId("governance.filter.actionTypeText").nth(4);
  const governanceCurrentStatusText = page.getByTestId("governance.filter.currentStatusText").nth(1);
  const governanceCardTitle = page.getByTestId("governance.card.actionTypeValue");
  const governanceStatusValue = page.getByTestId("governance.card.statusValue");
  const goToDashboard = async () => {
    await page.goto("/");
  };
  const goToPoolsFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await poolsTab.click();
  };

  const searchBarOnPool = async () => {
    await expect(searchBarPools).toHaveText("Pools");
  };

  const goToPools = async () => {
    await page.goto("/pools");
  };
  const goToEpochDetailsPage = async () => {
    await epochCardPools.click();
  };
  const goToPoolDetailsPage = async () => {
    await page.goto("/pools");
    await poolName.click();
  };
  const goToStakeAddressDetailPageByReward = async () => {
    await rewardAccountPool.click();
  };
  const goToStakeAddressDetailPageByOwner = async () => {
    await ownerAccountPool.click();
  };
  const goToEpochDetailPageByEpochValue = async () => {
    await epochValuePoolsList.click();
  };
  const goToEpochDetailPageByDelegatorValue = async () => {
    await stakingTitlePoolsList.click();
    await delegatorValuePoolsList.click();
  };
  const goToTransactionDetailPageByTxHashPoolCertificates = async () => {
    await certificatesHistoryTitlePoolsList.click();
    await txHashValuePoolsList.click();
  };

  const goToBlockDetailPageByBlockNumberPoolCertificates = async () => {
    await certificatesHistoryTitlePoolsList.click();
    await blockValuePoolsList.click();
  };

  const goToEpochDetailPageByEpochNumberPoolCertificates = async () => {
    await certificatesHistoryTitlePoolsList.click();
    await epochValuePoolsHistory.click();
  };

  const goToGovernanceVoteSection = async () => {
    await governanceTitle.click();
  };
  const openFilterModal = async () => {
    await governanceFilter.click();
  };
  const selectActionType = async () => {
    await governanceActionType.click();
    await governanceActionTypeText.click();
    await governanceApplyFilters.click();
  };

  const selectCurrentStatus = async () => {
    await governanceCurrentStatus.click();
    await governanceCurrentStatusText.click();
    await governanceApplyFilters.click();
  };

  const getAddressDetailsTitle = async () => {
    await expect(deatailPageTitle, "Check title on stake address detail").toHaveText("Stake Address Details");
  };
  const getTransactionDetailTitle = async () => {
    await expect(deatailPagesTitle, "Check title on transaction detail").toHaveText("Transaction Details");
  };
  const getEpochDetailTitle = async () => {
    await expect(deatailPagesTitle, "Check title on transaction detail").toHaveText("Epoch Details");
  };
  const getBlockDetailTitle = async () => {
    await expect(deatailBlockTitle, "Check title on block detail").toHaveText("Block Details");
  };
  const getGovernanceVoteCardTitle = async () => {
    await expect(governanceCardTitle, "Check title on block detail").toHaveText("Hard-Fork Initiation");
  };
  const getGovernanceVoteCardStatusValue = async () => {
    await expect(governanceStatusValue, "Check title on block detail").toHaveText("Open ballot");
  };

  const getEpochNoValue = async () => {
    const epochValue = epochValuePools.textContent();
    return epochValue;
  };
  const getEpochNoValueList = async () => {
    const epochValue = epochValuePoolsList.textContent();
    return epochValue;
  };

  return {
    goToDashboard,
    goToPoolsFromSidebar,
    searchBarOnPool,
    goToPools,
    goToEpochDetailsPage,
    goToPoolDetailsPage,
    goToStakeAddressDetailPageByReward,
    goToStakeAddressDetailPageByOwner,
    getAddressDetailsTitle,
    getEpochNoValue,
    goToEpochDetailPageByEpochValue,
    getEpochNoValueList,
    goToEpochDetailPageByDelegatorValue,
    goToTransactionDetailPageByTxHashPoolCertificates,
    goToBlockDetailPageByBlockNumberPoolCertificates,
    goToEpochDetailPageByEpochNumberPoolCertificates,
    getTransactionDetailTitle,
    getBlockDetailTitle,
    getEpochDetailTitle,
    goToGovernanceVoteSection,
    openFilterModal,
    selectActionType,
    getGovernanceVoteCardTitle,
    selectCurrentStatus,
    getGovernanceVoteCardStatusValue
  };
}
