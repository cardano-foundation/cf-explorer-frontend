import { createBdd } from "playwright-bdd";

import { blockfrostApi } from "playwright/api/call-blockfrost/blockfrost.api";
import { BlockInformationDto } from "playwright/api/dtos/blockInformation.dto";

import { blocksDashboard } from "../../../pages/blocks-dashboard.page";

const { Given, When, Then } = createBdd();

Given(/^the user is in the general dashboard page in explorer portal$/, async ({ page }) => {
  await blocksDashboard(page).goToDashboard();
});
When(/^the user selects the Blocks option inside the Blockchain drop down menu$/, async ({ page }) => {
  await blocksDashboard(page).goToEpochsFromSidebar();
});
Then(/^the user should see the blocks info containing the Search bar and Blocks table$/, async ({ page }) => {
  await blocksDashboard(page).searchBarOnBlocks();
  await blocksDashboard(page).checkBlocksTable();
});

Given(/^the user is in the blocks page in explorer portal$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
Given(/^the user open the block info detail widget of one of the blocks in the table$/, async ({ page }) => {
  await blocksDashboard(page).openLastestBlockWidget();
});
When(/^the user selects the view details button$/, async ({ page }) => {
  await blocksDashboard(page).goToBlockDetailFromWidget();
});
Then(
  /^the user should see the block detail page of the selected block with the Search bar, blockdetails and Transactions table$/,
  async ({ page, request }) => {
    const blockNo = await page.getByTestId("block.detail.overview.value.block");
    if (blockNo) {
      (await blockfrostApi(request).getBlockByNumber(parseInt(<string>await blockNo.textContent())))
        .json()
        .then(async (data) => {
          await blocksDashboard(page).checkBlockOverviewDetailPage({ blockFrostBlock: data as BlockInformationDto });
        });
    }
    await blocksDashboard(page).searchBarOnBlocks();
    await blocksDashboard(page).checkTransactionsTable();
  }
);

Given(/^the user is in the blocks page in explorer$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
When(/^the user selects the block number of one of the blocks record in the table$/, async ({ page }) => {
  await blocksDashboard(page).goToBlockDetailFromBlockNo();
});
Then(
  /^the user should see the block detail page of the selected block number in the table$/,
  async ({ page, request }) => {
    const blockNo = await page.getByTestId("block.detail.overview.value.block");
    if (blockNo) {
      (await blockfrostApi(request).getBlockByNumber(parseInt(<string>await blockNo.textContent())))
        .json()
        .then(async (data) => {
          await blocksDashboard(page).checkBlockOverviewDetailPage({ blockFrostBlock: data as BlockInformationDto });
        });
    }
  }
);

Given(/^the user is in the blocks list page in explorer$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
When(/^the user selects the block id of one of the blocks record in the table$/, async ({ page }) => {
  await blocksDashboard(page).goToBlockDetailFromBlockId();
});
Then(/^the user should see the block detail page of the selected block id in the table$/, async ({ page, request }) => {
  const blockNo = await page.getByTestId("block.detail.overview.value.block");
  if (blockNo) {
    (await blockfrostApi(request).getBlockByNumber(parseInt(<string>await blockNo.textContent())))
      .json()
      .then(async (data) => {
        await blocksDashboard(page).checkBlockOverviewDetailPage({ blockFrostBlock: data as BlockInformationDto });
      });
  }
});

Given(/^the user is in the blocks page in explorer portal web$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
When(/^the user selects the epoch number of one of the blocks record in the table$/, async ({ page }) => {
  await blocksDashboard(page).goToEpochDetailFromEpochNo();
});
Then(/^the user should see the epoch detail page of the selected epoch number in the table$/, async ({ page }) => {
  await blocksDashboard(page).checkEpochDetailPage();
});

Given(/^the user is in the blocks page in explorer portal for go to detail widget$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
When(
  /^the user selects any data of the row execpt the block number, block id or epoch number of one of the blocks record in the table$/,
  async ({ page }) => {
    await blocksDashboard(page).openLastestBlockWidget();
  }
);
Then(
  /^the user should see the block detail info widget with the Info widget data with the same data for the block id, absolute slot, created at date, fees and the total output in Ada of the selected block in the table$/,
  async ({ page, request }) => {
    const blockNo = await page.getByTestId("block.widget.blockno");
    if (blockNo) {
      (await blockfrostApi(request).getBlockByNumber(parseInt(<string>await blockNo.textContent())))
        .json()
        .then(async (data) => {
          await blocksDashboard(page).checkBlockWidget({ blockFrostBlock: data as BlockInformationDto });
        });
    }
  }
);

Given(/^the user is in the blocks page in explorer portal for go to block detail from widget$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
When(
  /^the user open the block info detail widget of one of the blocks in the table for go to block detail from widget$/,
  async ({ page }) => {
    await blocksDashboard(page).openLastestBlockWidget();
  }
);

Then(
  /^the user selects the block id into the block info detail widget user should see the block detail page of the selected block id$/,
  async ({ page, request }) => {
    const blockHash = await page.getByTestId("block.widget.blockHash");
    const ariaLabelValue = await blockHash?.getAttribute("aria-label");
    if (ariaLabelValue) {
      await blocksDashboard(page).goToBlockDetailFromWidgetByBlockHash();
      (await blockfrostApi(request).getBlockByHash(ariaLabelValue)).json().then(async (data) => {
        await blocksDashboard(page).checkBlockOverviewDetailPage({ blockFrostBlock: data as BlockInformationDto });
      });
    }
  }
);

Given(/^the user is in the Blocks section in the explorer page for go to trx detail from block$/, async ({ page }) => {
  await blocksDashboard(page).goToBlocks();
});
Given(/^the user go to the detail view page of one block for go to trx detail from block$/, async ({ page }) => {
  await blocksDashboard(page).openLastestBlockWidget();
  await blocksDashboard(page).goToBlockDetailFromWidgetByBlockHash();
});
When(
  /^the user selects the transaction hash of one record of the transactions table in the block detail view page$/,
  async ({ page }) => {
    await blocksDashboard(page).goToTrxDetailFromTrxTable();
  }
);
Then(
  /^the user should be redirected to the transaction details page of the select transaction in the block detail view page$/,
  async ({ page }) => {
    await blocksDashboard(page).checkTransactionsDetail();
  }
);

Given(
  /^the user is in the Blocks section in the explorer page for go to address detail from block$/,
  async ({ page }) => {
    await blocksDashboard(page).goToBlocks();
  }
);
Given(/^the user go to the detail view page of one block for go to address detail from block$/, async ({ page }) => {
  await blocksDashboard(page).openLastestBlockWidget();
  await blocksDashboard(page).goToBlockDetailFromWidgetByBlockHash();
});
When(
  /^the user selects one of the input - output addresses of one record of the transactions table in the block detail view page$/,
  async ({ page }) => {
    await blocksDashboard(page).goToAddressDetailFromTrxTable();
  }
);
Then(
  /^the user should be redirected to the address details page of the select address in the block detail view page$/,
  async ({ page }) => {
    await blocksDashboard(page).checkAddressDetail();
  }
);

Given(
  /^the user is in the Blocks section in the explorer page for go to transaction table from widget$/,
  async ({ page }) => {
    await blocksDashboard(page).goToBlocks();
  }
);
Given(
  /^the user selects one of the blocks to open the info widget for go to transaction table from widget$/,
  async ({ page }) => {
    await blocksDashboard(page).openLastestBlockWidget();
  }
);
When(/^the user selects the transactions section into the info widget of the selected block$/, async ({ page }) => {
  await blocksDashboard(page).goToBlockDetailFromWidgetByTrxTab();
});
Then(
  /^the user should see the selected block detail view page in the transactions table section$/,
  async ({ page }) => {
    await blocksDashboard(page).checkTransactionsTable();
  }
);

Given(
  /^the user is in the Blocks section in the explorer page for go to pool detail from producer$/,
  async ({ page }) => {
    await blocksDashboard(page).goToBlocks();
  }
);
Given(/^the user go to the detail view page of one block for go to pool detail from producer$/, async ({ page }) => {
  await blocksDashboard(page).openLastestBlockWidget();
  await blocksDashboard(page).goToBlockDetailFromWidgetByBlockHash();
});
When(/^the user selects the pool link in the block producer$/, async ({ page }) => {
  await blocksDashboard(page).goToPoolDetailByBlockProducer();
});
Then(/^the user should be redirected to the pool details page that produce the given block$/, async ({ page }) => {
  await blocksDashboard(page).checkPoolDetail();
});
