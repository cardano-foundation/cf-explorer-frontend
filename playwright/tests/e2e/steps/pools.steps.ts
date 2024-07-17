import { createBdd } from "playwright-bdd";

import { blockfrostApi } from "playwright/api/call-blockfrost/blockfrost.api";
import { blockDetailPage } from "playwright/pages/block-detail.page";
import { epochDetailPage } from "playwright/pages/epoch-detail.page";
import { poolOverviewPage } from "playwright/pages/pool.page";
import { stakeDetailPage } from "playwright/pages/stake-detail.page";
import { transactionDetailPage } from "playwright/pages/transaction-detail.page";

const { Given, When, Then } = createBdd();

let address: string | null;
let blockNo: string | null;
let epochNo: string | null;
let transactionHash: string | null;

Given(/^the user is in the general dashboard page in explorer portal site$/, async ({ page }) => {
  await poolOverviewPage(page).goToDashboard();
});
When(/^the user selects the Pools option inside the Blockchain drop down menu$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolsFromSidebar();
});
Then(
  /^the user should see the Pools page containing the Search bar, the General infor cards and the Pools table$/,
  async ({ page, request }) => {
    let lastEpoch;
    let poolHash;

    (await blockfrostApi(request).getLastEpochData()).json().then(async (data) => {
      lastEpoch = data;
    });
    (await blockfrostApi(request).getListPools({ count: 1, page: 1 })).json().then(async (data) => {
      poolHash = data[0] || "";
    });

    await poolOverviewPage(page).searchBarOnPool();
    await poolOverviewPage(page).checkPoolOverviewCard({ lastEpoch });
    await poolOverviewPage(page).checkPoolTable({ poolHash });
  }
);

Given(/^the user is in the Pools page$/, async ({ page }) => {
  await poolOverviewPage(page).goToPools();
});
When(/^the user selects the epoch info card in the pools page$/, async ({ page }) => {
  epochNo = await poolOverviewPage(page).getEpochNoValue();
  await poolOverviewPage(page).goToEpochDetailsPage();
});
Then(/^the user should be redirected to the current Epoch details page$/, async ({ page }) => {
  await epochDetailPage(page).checkEpochDetail({ epochNo: epochNo });
});

Given(/^the user is in the pools page in explorer portal$/, async ({ page }) => {
  await poolOverviewPage(page).goToPools();
});
When(/^the user selects one of the pools records$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
Then(
  /^the user should see the Pool details page of the selected pool with the Search bar, Pools details, Analytics chart, Epoch table, Staking delegators table, Pool certificates history table and Governance votes section$/,
  async ({ page, request }) => {
    let stakePool;
    let metadataPool;

    const poolId = page.url().split("/")[5].split("?")[0];

    (await blockfrostApi(request).getStakePools(poolId)).json().then(async (data) => {
      stakePool = data;
    });

    (await blockfrostApi(request).getMetadataPools(poolId)).json().then(async (data) => {
      metadataPool = data;
    });

    await poolOverviewPage(page).checkPoolDetailMetadata({ stakePool, metadataPool });
    await poolOverviewPage(page).checkPoolChart();
    await poolOverviewPage(page).checkPoolTab();
  }
);

Given(/^the user is in the Pools details site of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(
  /^the user selects the address hash under the Owner account part in the pool details section$/,
  async ({ page }) => {
    address = ((await page.getByTestId("pool.detail.ownerAccountValue").getAttribute("href")) || "")?.split("/")[3];
    await poolOverviewPage(page).goToStakeAddressDetail(address);
  }
);
Then(
  /^the user should be redirected to the Owner account address details page of the selected address hash$/,
  async ({ page }) => {
    await stakeDetailPage(page).checkStakeDetail({ address });
  }
);

Given(/^the user is in the Pools details web of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(/^the user selects an Epoch number from the epochs table$/, async ({ page }) => {
  epochNo = await poolOverviewPage(page).getEpochNoValueList();
  await poolOverviewPage(page).goToEpochDetailPageByEpochValue();
});
Then(/^the user should be redirected to the selected Epoch details page$/, async ({ page }) => {
  await epochDetailPage(page).checkEpochDetail({ epochNo: epochNo });
});

Given(/^the user is in the Pools details page site of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(/^the user selects an delegetor hash from the Staking delegators table$/, async ({ page }) => {
  await poolOverviewPage(page).openDelegatorTab();
  address = (await page.getByTestId("stakingDelegators.delegatorValue").first().getAttribute("aria-label")) || "";
  await poolOverviewPage(page).goToStakeAddressDetail(address);
});
Then(/^the user should be redirected to the selected Address details page$/, async ({ page }) => {
  await stakeDetailPage(page).checkStakeDetail({ address });
});

Given(/^the user is in the Pools details page web of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(/^the user selects a transaction hash from the Pool certificates History table$/, async ({ page }) => {
  await poolOverviewPage(page).openCertHistoryTab();
  transactionHash = (await page.getByTestId("poolHistory.txHashValue#0").getAttribute("aria-label")) || "";
  await poolOverviewPage(page).goToTransactionDetail(transactionHash);
});
Then(/^the user should be redirected to the selected Transaction details page$/, async ({ page }) => {
  await transactionDetailPage(page).checkTransactionsDetail({ transactionHash });
});

Given(/^the user is in the Pools details pages of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(/^the user selects a block number from the Pool certificates History table$/, async ({ page }) => {
  await poolOverviewPage(page).openCertHistoryTab();
  blockNo = (await page.getByTestId("poolHistory.blockValue#0").innerText()) || "";
  await poolOverviewPage(page).goToBlockDetail(blockNo);
});
Then(/^the user should be redirected to the selected Block details page$/, async ({ page }) => {
  await blockDetailPage(page).checkBlockDetail({ blockNo });
});

Given(/^the user is in the Pools details pages site of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(/^the user selects an epoch number from the Pool certificates History table$/, async ({ page }) => {
  await poolOverviewPage(page).openCertHistoryTab();
  epochNo = (await page.getByTestId("poolHistory.epochValue#0").innerText()) || "";
  await poolOverviewPage(page).goToEpochDetail(epochNo);
});
Then(/^the user should be redirected to the selected Epoch details page web$/, async ({ page }) => {
  await epochDetailPage(page).checkEpochDetail({ epochNo });
});

Given(/^the user is in the Pools overview page$/, async ({ page }) => {
  await poolOverviewPage(page).goToPools();
});
Given(/^the user selects the filter button$/, async ({ page }) => {
  await poolOverviewPage(page).openFilterPopup();
});
Then(/^the user should see all the Filter options displayed$/, async ({ page }) => {
  await poolOverviewPage(page).checkFilterLabel();
});

Given(/^the user is in the Pools overview page for test filter pool size$/, async ({ page }) => {
  await poolOverviewPage(page).goToPools();
});
Given(/^the user selects the filter button for test filter pool size$/, async ({ page }) => {
  await poolOverviewPage(page).openFilterPopup();
});
When(
  /^the user drags the points for a min and a max value in the bar for the pool size filter option$/,
  async ({ page }) => {
    await poolOverviewPage(page).dragMinMaxPoolSize();
  }
);
Then(
  /^the user should see just the pools that have a pool size between the min and max selected values$/,
  async ({ page }) => {
    poolOverviewPage(page).checkPoolsizeFilter();
  }
);

Given(/^the user is in the Pools overview page for test filter pool name$/, async ({ page }) => {
  await poolOverviewPage(page).goToPools();
});
Given(/^the user selects the filter button for test filter pool name$/, async ({ page }) => {
  await poolOverviewPage(page).openFilterPopup();
});
When(/^the user types some text in the pool name filter option$/, async ({ page }) => {
  await poolOverviewPage(page).fillPoolNameFilter();
});
Then(/^the user should see just the pools that contains the typed text$/, async ({ page }) => {
  poolOverviewPage(page).checkPoolNameFilter();
});

Given(/^the user is in the Pools overview page for test filter saturation$/, async ({ page }) => {
  await poolOverviewPage(page).goToPools();
});
Given(/^the user selects the filter button for test filter saturation$/, async ({ page }) => {
  await poolOverviewPage(page).openFilterPopup();
});
When(
  /^the user drags the points for a min and a max value in the bar for the pool saturation filter option$/,
  async ({ page }) => {
    await poolOverviewPage(page).dragMinMaxSaturation();
  }
);
Then(
  /^the user should see just the pools that have a saturation level between the min and max selected values$/,
  async ({ page }) => {
    poolOverviewPage(page).checkSarutationFilter();
  }
);
