import { expect, Page } from "@playwright/test";

import { BlockfrostEpochInformationDto } from "playwright/api/dtos/blockfrostEpochInformation.dto";
import { BlockfrostMetadataPoolDto, BlockfrostStakePoolDto } from "playwright/api/dtos/blockfrostPoolInformation.dto";

let maxPoolSize = 0;
let maxSaturation = 0;
const poolNameFilter = "A Cardano Pool Named 8964";

export function poolOverviewPage(page: Page) {
  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const poolsTab = page.getByTestId("submenu-button-pools");
  const searchBarPools = page.getByTestId("all-filters-dropdown");
  const epochCardPools = page.getByTestId("delegationOverview.epochCard");
  const rewardAccountPool = page.getByTestId("poolDetail.rewardAccountValue");
  const deatailPagesTitle = page.getByTestId("detail.page.title");
  const epochValuePools = page.getByTestId("delegationOverview.epochValue");
  const filterButton = page.getByTestId("filter.common.btn");

  const epochValuePoolsList = page.getByTestId("delegationEpochList.epochValue").first();
  const stakingTitlePoolsList = page.getByTestId("delegationDetail.stakingTitle");
  const certificatesHistoryTitlePoolsList = page.getByTestId("delegationDetail.certificatesHistoryTitle");
  const delegatorValuePoolsList = page.getByTestId("stakingDelegators.delegatorValue").first();

  // Pool Overview
  const delegationOverviewEpoch = page.getByTestId("delegationOverview.epochValue");
  const delegationOverviewSlotTitle = page.getByTestId("delegationOverview.slotTitle");
  const delegationOverviewLiveStakeTitle = page.getByTestId("delegationOverview.liveStakeTitle");
  const delegationOverviewDelegatorTitle = page.getByTestId("delegationOverview.delegatorsTitle");
  const delegationOverviewTotalPoolTitle = page.getByTestId("delegationOverview.totalPoolsTitle");

  // Pool Table
  const poolListNameTitle = page.getByTestId("poolList.poolNameTitle");
  const poolListNameValue = page.getByTestId("poolList.poolNameValue#0");
  const poolListPoolSizeTitle = page.getByTestId("poolList.poolSizeTitle");
  const poolListDeclaredTitle = page.getByTestId("poolList.declaredPledgeTitle");
  const poolListSaturationTitle = page.getByTestId("poolList.saturationTitle");
  const poolListBlockInEpochTitle = page.getByTestId("poolList.blockInEpochTitle");
  const poolListBlockLifetimeTitle = page.getByTestId("poolList.blockLifetimeTitle");
  const poolListPoolSizeValue = page.getByTestId("poolList.poolSizeValue#0");
  const poolListSaturationValue = page.getByTestId("poolList.saturationValue#0");
  const poolListPoolNameValue = page.getByTestId("poolList.poolNameValue#0");

  // Pool Detail Metadata
  const poolDetailName = page.getByTestId("pool.detail.name");
  const poolDetaiPoolId = page.getByTestId("pool.detail.poolId");
  const poolDetaiHash = page.getByTestId("pool.detail.hash");
  const poolDetaiHomepage = page.getByTestId("pool.detail.homepage");
  const poolDetaiDescription = page.getByTestId("pool.detail.description");
  const poolDetaiTicker = page.getByTestId("pool.detail.tickerValue");
  const poolDetaiRewardAccount = page.getByTestId("pool.detail.rewardAccountValue");
  const poolDetaiOwnerAccount = page.getByTestId("pool.detail.ownerAccountValue");
  const poolDetaiPoolSize = page.getByTestId("pool.detail.poolSizeValue");
  const poolDetaiDelegatorsValue = page.getByTestId("pool.detail.delegatorsValue");
  const poolDetaiFixedCostValue = page.getByTestId("delegationDetailOverview.fixedCostValue");
  const poolDetaiDeclaredPledgeValue = page.getByTestId("delegationDetailOverview.declaredPledgeValue");
  const poolDetaiEpochBlockValue = page.getByTestId("delegationDetailOverview.epochBlocksValue");
  const poolDetaiLifeTimeBlockValue = page.getByTestId("delegationDetailOverview.lifetimeBlocksValue");

  // Pool Detail Chart
  const poolDetaiChartTitle = page.getByTestId("delegatorChart.analytics");
  const poolDetaiChartStakeTab = page.getByTestId("delegatorChart.stake");
  const poolDetaiChartDelegatorTab = page.getByTestId("delegatorChart.delegator");
  const poolDetaiChartHighestTitle = page.getByTestId("delegatorChart.highestTitle");
  const poolDetaiChartLowestTitle = page.getByTestId("delegatorChart.lowestTitle");

  // Pool Detail Tab
  const poolDetaiEpochTab = page.getByTestId("delegationDetail.epochTitle");
  const poolDetaiStakingTab = page.getByTestId("delegationDetail.stakingTitle");
  const poolDetaiPoolCertTab = page.getByTestId("delegationDetail.certificatesHistoryTitle");

  // Delegation Filter
  const poolFilterRetiredPoolsTitle = page.getByTestId("delegationList.retiredPoolsTitle");
  const poolFilterPoolNameTitle = page.getByTestId("filterRange.poolNameTitle");
  const poolFilterPoolSizeTitle = page.getByTestId("filterRange.poolSizeTitle");
  const poolFilterPledgeTitle = page.getByTestId("filterRange.pledgeTitle");
  const poolFilterSaturationTitle = page.getByTestId("filterRange.saturationTitle");
  const poolFilterBlockLifetimeTitle = page.getByTestId("filterRange.blocksLifeTimeTitle");
  const poolFilterApplyBtn = page.getByTestId("filterRange.applyFilters");
  const poolFilterResetBtn = page.getByTestId("filterRange.resetFilters");
  const poolFilterPoolSizeMin = page.locator('div[data-testid="filterRange.minPoolSize"] input');
  const poolFilterPoolSizeMax = page.locator('div[data-testid="filterRange.maxPoolSize"] input');
  const poolFilterPoolName = page.locator('div[data-testid="filterRange.poolNameValue"] input');
  const poolFilterSaturationMin = page.locator('div[data-testid="filterRange.minSaturation"] input');
  const poolFilterSaturationMax = page.locator('div[data-testid="filterRange.maxSaturation"] input');

  const checkPoolNameFilter = () => {
    setTimeout(async () => {
      expect(poolListPoolNameValue).toContainText(poolNameFilter);
    }, 10000);
  };

  const checkPoolsizeFilter = () => {
    setTimeout(async () => {
      expect(+(await poolListPoolSizeValue.innerText()).replaceAll(",", "").replaceAll(".", "")).toBeLessThanOrEqual(
        maxPoolSize
      );
    }, 10000);
  };

  const checkSarutationFilter = () => {
    setTimeout(async () => {
      expect(+(await poolListSaturationValue.innerText()).replaceAll("%", "").replaceAll(".", "")).toBeLessThanOrEqual(
        +`${maxSaturation}`.replaceAll(".", "")
      );
    }, 10000);
  };

  const checkPoolOverviewCard = async ({ lastEpoch }: { lastEpoch?: BlockfrostEpochInformationDto }) => {
    expect(+(await delegationOverviewEpoch.innerText())).toEqual(lastEpoch?.epoch);
    expect(delegationOverviewSlotTitle).toContainText("Slot");
    expect(delegationOverviewLiveStakeTitle).toContainText("Live Stake");
    expect(delegationOverviewDelegatorTitle).toContainText("Delegators");
    expect(delegationOverviewTotalPoolTitle).toContainText("Total Pools");
  };

  const checkPoolTable = async ({ poolHash }: { poolHash?: string }) => {
    const urlRidrect = await poolListNameValue.getAttribute("href");
    expect(poolListNameTitle).toContainText("Pool");
    expect(poolListPoolSizeTitle).toContainText("Pool size");
    expect(poolListDeclaredTitle).toContainText("Declared Pledge");
    expect(poolListSaturationTitle).toContainText("Saturation");
    expect(poolListBlockInEpochTitle).toContainText("Blocks in Epoch");
    expect(poolListBlockLifetimeTitle).toContainText("Blocks Lifetime");
    expect(urlRidrect?.includes(poolHash || "")).toBe(true);
  };

  const checkPoolDetailMetadata = async ({
    stakePool,
    metadataPool
  }: {
    stakePool?: BlockfrostStakePoolDto;
    metadataPool?: BlockfrostMetadataPoolDto;
  }) => {
    const rewardAccountHref = await poolDetaiRewardAccount.getAttribute("href");
    const ownerAccountHref = await poolDetaiOwnerAccount.getAttribute("href");

    expect(poolDetailName).toContainText(metadataPool?.name || "");
    expect(poolDetaiPoolId).toContainText(metadataPool?.pool_id || "");
    expect(poolDetaiHash).toContainText(metadataPool?.hex || "");
    expect(poolDetaiHomepage).toContainText(metadataPool?.homepage || "");
    expect(poolDetaiDescription).toContainText(metadataPool?.description || "");
    expect(poolDetaiTicker).toContainText(metadataPool?.ticker || "");
    expect(rewardAccountHref).toContain(stakePool?.reward_account);
    expect(stakePool?.owners.includes(ownerAccountHref?.split("/")[3] || "")).toBe(true);
    expect(+(await poolDetaiPoolSize.innerText()).replaceAll(",", "").replaceAll(".", "")).toEqual(
      +(stakePool?.active_stake || 0)
    );
    expect(+(await poolDetaiDelegatorsValue.innerText())).toEqual(stakePool?.live_delegators || 0);
    expect(+(await poolDetaiFixedCostValue.innerText()) * 10 ** 6).toEqual(+(stakePool?.fixed_cost || 0));
    expect(+(await poolDetaiDeclaredPledgeValue.innerText()).replaceAll(",", "") * 10 ** 6).toEqual(
      +(stakePool?.declared_pledge || 0)
    );
    expect(+(await poolDetaiEpochBlockValue.innerText())).toEqual(stakePool?.blocks_epoch || 0);
    expect(+(await poolDetaiLifeTimeBlockValue.innerText()).replaceAll(",", "")).toEqual(stakePool?.blocks_minted || 0);
  };

  const checkPoolChart = async () => {
    expect(poolDetaiChartTitle).toContainText("Analytics");
    expect(poolDetaiChartStakeTab).toContainText("Stake");
    expect(poolDetaiChartDelegatorTab).toContainText("Delegator");
    expect(poolDetaiChartHighestTitle).toContainText("Highest stake");
    expect(poolDetaiChartLowestTitle).toContainText("Lowest stake");
  };

  const checkPoolTab = async () => {
    expect(poolDetaiEpochTab).toContainText("Epoch");
    expect(poolDetaiStakingTab).toContainText("Staking Delegators");
    expect(poolDetaiPoolCertTab).toContainText("Pool Certificates History");
  };

  const checkFilterLabel = async () => {
    expect(poolFilterRetiredPoolsTitle).toContainText("Show Retired Pools");
    expect(poolFilterPoolNameTitle).toContainText("Pool Name");
    expect(poolFilterPoolSizeTitle).toContainText("Pool Size");
    expect(poolFilterPledgeTitle).toContainText("Pledge");
    expect(poolFilterSaturationTitle).toContainText("Saturation");
    expect(poolFilterBlockLifetimeTitle).toContainText("Blocks lifetime");
    expect(poolFilterApplyBtn).toContainText("Apply Filters");
    expect(poolFilterResetBtn).toContainText("Reset");
  };

  const dragMinMaxPoolSize = async () => {
    await poolFilterPoolSizeTitle.click();
    maxPoolSize = +((await poolFilterPoolSizeMax.getAttribute("value")) || 0) / 2;
    await poolFilterPoolSizeMin.fill("0");
    await poolFilterPoolSizeMax.fill(`${maxPoolSize}`);
    await poolFilterApplyBtn.click();
  };

  const dragMinMaxSaturation = async () => {
    await poolFilterSaturationTitle.click();

    maxSaturation = +((await poolFilterSaturationMax.getAttribute("value")) || 0) / 2;
    await poolFilterSaturationMin.fill("0");
    await poolFilterSaturationMax.fill(`${maxSaturation}`);
    await poolFilterApplyBtn.click();
  };

  const openFilterPopup = async () => {
    await filterButton.click();
  };

  const openDelegatorTab = async () => {
    await stakingTitlePoolsList.click();
  };

  const openCertHistoryTab = async () => {
    await certificatesHistoryTitlePoolsList.click();
  };

  const goToDashboard = async () => {
    await page.goto("/");
  };

  const goToPoolsFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await poolsTab.click();
  };

  const goToPools = async () => {
    await page.goto("/pools");
  };

  const goToEpochDetailsPage = async () => {
    await epochCardPools.click();
  };

  const goToPoolDetailsPage = async () => {
    await page.goto("/pools");
    await poolListNameValue.click();
  };

  const goToStakeAddressDetailPageByReward = async () => {
    await rewardAccountPool.click();
  };

  const goToStakeAddressDetail = async (address: string) => {
    await page.goto("/stake-address/" + address);
  };

  const goToEpochDetailPageByEpochValue = async () => {
    await epochValuePoolsList.click();
  };

  const goToEpochDetailPageByDelegatorValue = async () => {
    await stakingTitlePoolsList.click();
    await delegatorValuePoolsList.click();
  };

  const goToTransactionDetail = async (transactionHash: string) => {
    await page.goto("/transaction/" + transactionHash);
  };

  const goToBlockDetail = async (blockNo: string) => {
    await page.goto("/block/" + blockNo);
  };

  const goToEpochDetail = async (epochNo: string) => {
    await page.goto("/epoch/" + epochNo);
  };

  const getTransactionDetailTitle = async () => {
    await expect(deatailPagesTitle, "Check title on transaction detail").toHaveText("Transaction Details");
  };

  const getEpochNoValue = async () => {
    const epochValue = epochValuePools.textContent();
    return epochValue;
  };

  const getEpochNoValueList = async () => {
    const epochValue = epochValuePoolsList.textContent();
    return epochValue;
  };

  const fillPoolNameFilter = async () => {
    await poolFilterPoolNameTitle.click();
    await poolFilterPoolName.fill(poolNameFilter);
    await poolFilterApplyBtn.click();
  };

  const searchBarOnPool = async () => {
    await expect(searchBarPools).toHaveText("Pools");
  };

  return {
    checkPoolOverviewCard,
    checkPoolTable,
    checkPoolDetailMetadata,
    checkPoolChart,
    checkPoolTab,
    checkFilterLabel,
    checkPoolNameFilter,
    checkPoolsizeFilter,
    checkSarutationFilter,
    dragMinMaxPoolSize,
    dragMinMaxSaturation,
    openFilterPopup,
    openDelegatorTab,
    openCertHistoryTab,
    goToDashboard,
    goToPoolsFromSidebar,
    goToPools,
    goToEpochDetailsPage,
    goToPoolDetailsPage,
    goToStakeAddressDetailPageByReward,
    goToStakeAddressDetail,
    getEpochNoValue,
    goToEpochDetailPageByEpochValue,
    getEpochNoValueList,
    goToEpochDetailPageByDelegatorValue,
    goToTransactionDetail,
    goToBlockDetail,
    goToEpochDetail,
    getTransactionDetailTitle,
    fillPoolNameFilter,
    searchBarOnPool
  };
}
