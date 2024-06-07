import { createBdd } from "playwright-bdd";

import { blockfrostApi } from "playwright/api/call-blockfrost/blockfrost.api";
import { epochsDashboardPage } from "playwright/pages/epochs-dashboard.page";
import { epochDetailPage } from "playwright/pages/epoch-detail.page";

const { Given, When, Then } = createBdd();

let blockId: string | null;

Given(/^the user is in the general dashboard page in explorer portal$/, async ({ page }) => {
  await epochsDashboardPage(page).goToDashboard();
});
When(/^the user selects the Epochs option inside the Blockchain drop down menu$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochsFromSidebar();
});
Then(
  /^the user should see the epochs info containing the Search bar, Current epoch resume info and the Finished epochs table$/,
  async ({ page, request }) => {
    let lastEpoch;

    (await blockfrostApi(request).getLastEpochData()).json().then(async (data) => {
      lastEpoch = data;
    });

    await epochsDashboardPage(page).searchBarOnEpochs();
    await epochsDashboardPage(page).checkCurrentEpoch({ lastEpoch });
    await epochsDashboardPage(page).checkTableFinishedEpochTable();
  }
);

Given(/^the user is in the Epochs section in the explorer page$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochs();
});
When(/^the user selects the current epoch number$/, async ({ page }) => {
  await epochsDashboardPage(page).openWidgetCurrentEpoch();
});
Then(
  /^the user should see a widget containing the Info widget data with the same epoch number, start time, end time, blocks number and slot number of the selected current active epoch$/,
  async ({ page, request }) => {
    (await blockfrostApi(request).getLastEpochData()).json().then(async (data) => {
      await epochsDashboardPage(page).checkCurrentEpochWidget({ currentEpoch: data });
    });
  }
);

Given(/^the user is in the Epochs section in the explorer page with finished epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochs();
});
When(
  /^the user selects one of the finished epochs record or the eye symbol at the end of the row$/,
  async ({ page }) => {
    await epochsDashboardPage(page).openWidgetFinishedEpoch();
  }
);
Then(
  /^the user should see a widget containing the Info widget data with the same data of the selected epoch in the table$/,
  async ({ page, request }) => {
    const epochNo = page.getByTestId("epoch.detailViewEpoch.epochValue");
    (await blockfrostApi(request).getEpochById(parseInt(<string>await epochNo.textContent())))
      .json()
      .then(async (data) => {
        await epochsDashboardPage(page).checkFinishedEpochWidget({ currentEpoch: data });
      });
  }
);

Given(/^the user is in the Epochs section in the explorer page to current epoch detail$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochs();
});
Given(/^the user open the info widget of the current active epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).openWidgetCurrentEpoch();
});
When(/^the user selects the view details button in the info widget$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochsDetailFromWidget();
});
Then(
  /^the user should see the epoch detail view info page containing the Search bar, Epoch details and the Blocks table with the data of active epoch$/,
  async ({ page, request }) => {
    const epochNo = page.locator('[data-test-id="CircularProgressbarWithChildren__children"] > a');
    (await blockfrostApi(request).getEpochById(parseInt(<string>await epochNo.textContent())))
      .json()
      .then(async (data) => {
        await epochDetailPage(page).checkEpochDetailPage({ currentEpoch: data });
      });
  }
);

Given(/^the user is in the Epochs section in the explorer page to finished epoch detail$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochs();
});
Given(/^the user open the info widget of one finished epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).openWidgetFinishedEpoch();
});
When(/^the user selects the view details button in the info finished epoch widget$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochsDetailFromWidget();
});
Then(
  /^the user should see the epoch detail view info page containing the Search bar, Epoch details and the Blocks table with the data of the select finished epoch$/,
  async ({ page, request }) => {
    const epochNo = page.locator('[data-test-id="CircularProgressbarWithChildren__children"] > a');
    (await blockfrostApi(request).getEpochById(parseInt(<string>await epochNo.textContent())))
      .json()
      .then(async (data) => {
        await epochDetailPage(page).checkEpochDetailPage({ currentEpoch: data });
      });
  }
);

Given(/^the user is in the Epochs section in the explorer page to block detail$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochs();
});
Given(/^the user go to the detail view page of one epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).openWidgetFinishedEpoch();
  await epochsDashboardPage(page).goToEpochsDetailFromWidget();
});
When(
  /^the user selects the block number of one record of the blocks table in the epoch detail view page$/,
  async ({ page }) => {
    const firstBlockInEpochDetail = page.getByTestId("epochList.blockValue#0");
    blockId = await firstBlockInEpochDetail.textContent();
    await firstBlockInEpochDetail.click();
  }
);
Then(
  /^the user should be redirected to the block details page of the select block in the epoch detail view page$/,
  async ({ page }) => {
    await epochDetailPage(page).checkBlockDetailPage({ blockId });
  }
);

Given(/^the user is in the Epochs section in the explorer page to block detail by block id$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochs();
});
Given(/^the user go to the detail view page of one finished epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).openWidgetFinishedEpoch();
  await epochsDashboardPage(page).goToEpochsDetailFromWidget();
});
When(
  /^the user selects the block id of one record of the blocks table in the epoch detail view page$/,
  async ({ page }) => {
    const firstBlockInEpochDetail = page.getByTestId("epochList.blockValue#0");
    blockId = await firstBlockInEpochDetail.textContent();
    await firstBlockInEpochDetail.click();
  }
);
Then(
  /^the user should be redirected to the block details page of the select block in the epoch detail view page by blockid$/,
  async ({ page }) => {
    await epochDetailPage(page).checkBlockDetailPage({ blockId });
  }
);

Given(/^the user is in the Epochs section in the explorer page to block list by block tab$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochs();
});
Given(/^the user selects one of the epochs open widget Epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).openWidgetFinishedEpoch();
});
When(/^user selects the blocks section into the info widget of the selected epoch$/, async ({ page }) => {
  await epochsDashboardPage(page).goToEpochsDetailFromWidgetByBlockTab();
});
Then(
  /^the user should see the selected epoch detail view page in the blocks table section$/,
  async ({ page, request }) => {
    const epochNo = page.locator('[data-test-id="CircularProgressbarWithChildren__children"] > a');
    (await blockfrostApi(request).getEpochById(parseInt(<string>await epochNo.textContent())))
      .json()
      .then(async (data) => {
        await epochDetailPage(page).checkEpochDetailPage({ currentEpoch: data });
      });
  }
);
