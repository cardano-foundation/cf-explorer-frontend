import { expect, Page } from "@playwright/test";
import moment from "moment";

import { BlockInformationDto } from "playwright/api/dtos/blockInformation.dto";

export function blocksDashboard(page: Page) {
  const blocksTable = page.getByTestId("blocks-card");
  const firstBlocksID = page.locator("td > [aria-label]").first();
  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const epochsTab = page.getByTestId("submenu-button-blocks");
  const searchBarEpoch = page.getByTestId("all-filters-dropdown");

  //Blocks Table
  const blocksTableTitleBlock = page.getByTestId("blocks.table.title.block");
  const blocksTableValueBlock = page.getByTestId("blocks.table.value.block#2");
  const blocksTableTitleBlockId = page.getByTestId("blocks.table.title.blockId");
  const blocksTableValueBlockId = page.getByTestId("blocks.table.value.blockId#2");
  const blocksTableTitleEpoch = page.getByTestId("blocks.table.title.epoch");
  const blocksTableValueEpoch = page.getByTestId("blocks.table.value.epoch#2");
  const blocksTableTitleSlot = page.getByTestId("blocks.table.title.slot");
  const blocksTableTitleAbsSlot = page.getByTestId("blocks.table.title.absoluteSlot");
  const blocksTableTitleCreateAt = page.getByTestId("blocks.table.title.createAt");
  const blocksTableTitleTransactionsCount = page.getByTestId("blocks.table.title.transactions");
  const blocksTableTitleFee = page.getByTestId("blocks.table.title.fee");
  const blocksTableTitleOutput = page.getByTestId("blocks.table.title.output");
  const blocksTableValueSlot = page.getByTestId("blocks.table.value.slot#2");

  //Block widget
  const blocksWidgetViewDetailButton = page.getByTestId("block.detailViewEpoch.viewDetail");
  const blocksWidgetEpochNo = page.getByTestId("block.widget.epochNo");
  const blocksWidgetSlotNo = page.getByTestId("block.widget.slotNo");
  const blocksWidgetAbsSlotNo = page.getByTestId("block.widget.absSlotNo");
  const blocksWidgetCreatedAt = page.getByTestId("block.widget.createdAt");
  const blocksWidgetConfirmation = page.getByTestId("block.widget.confirmation");
  const blocksWidgetFee = page.getByTestId("block.widget.fees");
  const blocksWidgetOutput = page.getByTestId("block.widget.output");
  const blocksWidgetBlockHash = page.getByTestId("block.widget.blockHash");
  const blocksWidgetTrxTab = page.getByTestId("block.widget.trxTab");

  const goToDashboard = async () => {
    await page.goto("/");
  };
  const goToBlocks = async () => {
    await page.goto("/blocks");
  };

  const goToEpochsFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await epochsTab.click();
  };

  const openLastestBlockWidget = async () => {
    await blocksTableValueSlot.click();
  };

  const goToBlockDetailFromWidget = async () => {
    await blocksWidgetViewDetailButton.click();
  };

  const goToBlockDetailFromWidgetByBlockHash = async () => {
    await blocksWidgetBlockHash.click();
  };

  const goToBlockDetailFromBlockNo = async () => {
    await blocksTableValueBlock.click();
  };

  const goToBlockDetailFromBlockId = async () => {
    await blocksTableValueBlockId.click();
  };

  const goToEpochDetailFromEpochNo = async () => {
    await blocksTableValueEpoch.click();
  };

  const goToBlockDetailFromWidgetByTrxTab = async () => {
    await blocksWidgetTrxTab.click();
  };

  const openLastBlockDetails = async () => {
    await expect(blocksTable).toBeVisible();
    await firstBlocksID.click();
  };

  const searchBarOnBlocks = async () => {
    await expect(searchBarEpoch).toHaveText("Blocks");
  };

  const checkBlocksTable = async () => {
    await expect(blocksTableTitleBlock, "Check title on blocks table").toHaveText("Block");
    await expect(blocksTableTitleBlockId, "Check title on blocks table").toHaveText("Block ID");
    await expect(blocksTableTitleEpoch, "Check title on blocks table").toHaveText("Epoch");
    await expect(blocksTableTitleSlot, "Check title on blocks table").toHaveText("Slot");
    await expect(blocksTableTitleAbsSlot, "Check title on blocks table").toHaveText("Absolute Slot");
    await expect(blocksTableTitleCreateAt, "Check title on blocks table").toHaveText("Created At");
    await expect(blocksTableTitleTransactionsCount, "Check title on blocks table").toHaveText("Transactions");
    await expect(blocksTableTitleFee, "Check title on blocks table").toHaveText("Fees");
    await expect(blocksTableTitleOutput, "Check title on finished epoch table").toHaveText("Output");
  };

  const checkBlockWidget = async ({ blockFrostBlock }: { blockFrostBlock: BlockInformationDto }) => {
    expect(+((await blocksWidgetEpochNo.textContent()) || 0), "Check epoch on block widget").toEqual(
      blockFrostBlock.epoch
    );
    expect(
      +((await blocksWidgetSlotNo.textContent())?.split("/")[0] || 0),
      "Slot no in block widget to equal total fee in block on Blockfrost "
    ).toEqual(+(blockFrostBlock?.epoch_slot || 0));

    expect(
      +((await blocksWidgetAbsSlotNo.textContent()) || 0),
      "Absolute slot in block widget to equal total fee in block on Blockfrost "
    ).toEqual(+(blockFrostBlock?.slot || 0));

    expect(
      moment((await blocksWidgetCreatedAt.textContent())?.replace(",", "")).unix(),
      "Created time to equal create time epoch Blockfrost"
    ).toEqual(blockFrostBlock?.time);

    expect(
      +((await blocksWidgetConfirmation.textContent()) || 0),
      "Confirmation in block widget to equal total fee in block on Blockfrost "
    ).toBeGreaterThanOrEqual(+(blockFrostBlock?.confirmations || 0));

    expect(
      +((await blocksWidgetFee.textContent())?.replaceAll(",", "") || 0) * 10 ** 6,
      "Total fees in block widget to equal total fee in block on Blockfrost "
    ).toEqual(+(blockFrostBlock?.fees || 0));

    expect(
      +((await blocksWidgetOutput.textContent())?.replaceAll(",", "") || 0) * 10 ** 6,
      "Total output in block widget to equal total fee in block on Blockfrost "
    ).toEqual(+(blockFrostBlock?.output || 0));
  };

  return {
    openLastBlockDetails,
    goToDashboard,
    goToEpochsFromSidebar,
    goToBlocks,
    searchBarOnBlocks,
    checkBlocksTable,
    openLastestBlockWidget,
    goToBlockDetailFromWidget,
    goToBlockDetailFromBlockNo,
    goToEpochDetailFromEpochNo,
    goToBlockDetailFromBlockId,
    checkBlockWidget,
    goToBlockDetailFromWidgetByBlockHash,
    goToBlockDetailFromWidgetByTrxTab
  };
}
