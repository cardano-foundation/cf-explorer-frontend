import { createBdd } from "playwright-bdd";

import { epochDetailPage } from "playwright/pages/epoch-detail.page";
import { poolOverviewPage } from "playwright/pages/pool.page";

const { Given, When, Then } = createBdd();

let epochNo: string | null;

Given(/^the user is in the general dashboard page in explorer portal site$/, async ({ page }) => {
  await poolOverviewPage(page).goToDashboard();
});
When(/^the user selects the Pools option inside the Blockchain drop down menu$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolsFromSidebar();
});
Then(
  /^the user should see the Pools page containing the Search bar, the General infor cards and the Pools table$/,
  async ({ page }) => {
    await poolOverviewPage(page).searchBarOnPool();
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

Given(/^the user is in the Pools details page of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(
  /^the user selects the address hash under the Reward account part in the pool details section$/,
  async ({ page }) => {
    await poolOverviewPage(page).goToStakeAddressDetailPageByReward();
  }
);
Then(
  /^the user should be redirected to the reward account address details page of the selected address hash$/,
  async ({ page }) => {
    await poolOverviewPage(page).getAddressDetailsTitle();
  }
);

Given(/^the user is in the Pools details site of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(
  /^the user selects the address hash under the Owner account part in the pool details section$/,
  async ({ page }) => {
    await poolOverviewPage(page).goToStakeAddressDetailPageByOwner();
  }
);
Then(
  /^the user should be redirected to the Owner account address details page of the selected address hash$/,
  async ({ page }) => {
    await poolOverviewPage(page).getAddressDetailsTitle();
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
  await poolOverviewPage(page).goToEpochDetailPageByDelegatorValue();
});
Then(/^the user should be redirected to the selected Address details page$/, async ({ page }) => {
  await poolOverviewPage(page).getAddressDetailsTitle();
});

Given(/^the user is in the Pools details page web of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(/^the user selects a transaction hash from the Pool certificates History table$/, async ({ page }) => {
  await poolOverviewPage(page).goToTransactionDetailPageByTxHashPoolCertificates();
});
Then(/^the user should be redirected to the selected Transaction details page$/, async ({ page }) => {
  await poolOverviewPage(page).getTransactionDetailTitle();
});

Given(/^the user is in the Pools details pages of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(/^the user selects a block number from the Pool certificates History table$/, async ({ page }) => {
  await poolOverviewPage(page).goToBlockDetailPageByBlockNumberPoolCertificates();
});
Then(/^the user should be redirected to the selected Block details page$/, async ({ page }) => {
  await poolOverviewPage(page).getBlockDetailTitle();
});

Given(/^the user is in the Pools details pages site of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
When(/^the user selects an epoch number from the Pool certificates History table$/, async ({ page }) => {
  await poolOverviewPage(page).goToEpochDetailPageByEpochNumberPoolCertificates();
});
Then(/^the user should be redirected to the selected Epoch details page web$/, async ({ page }) => {
  await poolOverviewPage(page).getEpochDetailTitle();
});

Given(/^the user is in the Pools details pages web of one Pool$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
Given(/^the user selects the Governance votes section$/, async ({ page }) => {
  await poolOverviewPage(page).goToGovernanceVoteSection();
});
When(/^the user filter by one of the Action types$/, async ({ page }) => {
  await poolOverviewPage(page).openFilterModal();
  await poolOverviewPage(page).selectActionType();
});
Then(/^the user should see just the votes that has the same action type as the selected filter$/, async ({ page }) => {
  await poolOverviewPage(page).getGovernanceVoteCardTitle();
});

Given(/^the user is in the Pools details pages web of one Pool page$/, async ({ page }) => {
  await poolOverviewPage(page).goToPoolDetailsPage();
});
Given(/^the user selects the Governance votes section current status$/, async ({ page }) => {
  await poolOverviewPage(page).goToGovernanceVoteSection();
});
When(/^the user filter by one of the current status$/, async ({ page }) => {
  await poolOverviewPage(page).openFilterModal();
  await poolOverviewPage(page).selectCurrentStatus();
});
Then(
  /^the user should see just the votes that has the same status as the selected filter current status$/,
  async ({ page }) => {
    await poolOverviewPage(page).getGovernanceVoteCardStatusValue();
  }
);
