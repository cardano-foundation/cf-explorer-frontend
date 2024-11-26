import { expect, Page } from "@playwright/test";

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
  const blocksTableValueSlot = page.getByTestId("blocks.table.value.slot#2");

  const goToDashboard = async () => {
    await page.goto("/");
  };
  const goToBlocks = async () => {
    await page.goto("/blocks", { timeout: 60000 }); // Increased timeout to 60 seconds
  };

  const goToEpochsFromSidebar = async () => {
    await sidebarBlockchainButton.click();
    await epochsTab.click();
  };

  const openLastestBlockWidget = async () => {
    await blocksTableValueSlot.click();
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
  };

  return {
    openLastBlockDetails,
    goToDashboard,
    goToEpochsFromSidebar,
    goToBlocks,
    searchBarOnBlocks,
    checkBlocksTable,
    openLastestBlockWidget,
    goToBlockDetailFromBlockNo,
    goToEpochDetailFromEpochNo,
    goToBlockDetailFromBlockId
  };
}
