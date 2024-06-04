import { expect, Page } from "@playwright/test";
import moment from "moment";

import { BlockInformationDto } from "playwright/api/dtos/blockInformation.dto";

export function blocksDashboard(page: Page) {
  const blocksTable = page.getByTestId("blocks-card");
  const firstBlocksID = page.locator("td > [aria-label]").first();

  const sidebarBlockchainButton = page.getByTestId("menu-button-blockchain");
  const epochsTab = page.getByTestId("submenu-button-blocks");
  const searchBarEpoch = page.getByTestId("all-filters-dropdown");
  const deatailPageTitle = page.getByTestId("detail.page.title");
  const addressDetailTitle = page.getByTestId("address-detail-title");

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

  //Block detail
  const blocksDetailHeader = page.getByTestId("block.detail.header");
  const blocksDetailProducer = page.getByTestId("block.detail.overview.value.producer");
  const blocksDetailCreateTime = page.getByTestId("block.detail.overview.value.createAt");
  const blocksDetailConfirmation = page.getByTestId("block.detail.overview.value.confirmation");
  const blocksDetailTotalTrx = page.getByTestId("block.detail.overview.value.transactions");
  const blocksDetailTrxFee = page.getByTestId("block.detail.overview.value.transactionFee");
  const blocksDetailOutput = page.getByTestId("block.detail.overview.value.output");

  //Block detail - Transactions Table
  const blocksDetailTrxTableTxhash = page.getByTestId("block.detail.trxTable.txhash");
  const blocksDetailTrxTableCreatedAt = page.getByTestId("block.detail.trxTable.createdAt");
  const blocksDetailTrxTableAddress = page.getByTestId("block.detail.trxTable.address");
  const blocksDetailTrxTableFees = page.getByTestId("block.detail.trxTable.fees");
  const blocksDetailTrxTableoutput = page.getByTestId("block.detail.trxTable.output");
  const blocksDetailTrxTableValueTrx = page.getByTestId("block.detail.trxTable.value.txhash#0");
  const blocksDetailTrxTableValueInputAddress = page.getByTestId("block.detail.trxTable.value.inputAddress#0");

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

  const goToTrxDetailFromTrxTable = async () => {
    await blocksDetailTrxTableValueTrx.click();
  };

  const goToAddressDetailFromTrxTable = async () => {
    await blocksDetailTrxTableValueInputAddress.click();
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

  const goToPoolDetailByBlockProducer = async () => {
    await blocksDetailProducer.click();
  };

  const openLastBlockDetails = async () => {
    await expect(blocksTable).toBeVisible();
    await firstBlocksID.click();
  };

  const searchBarOnBlocks = async () => {
    await expect(searchBarEpoch).toHaveText("Blocks");
  };

  const checkEpochDetailPage = async () => {
    expect(deatailPageTitle, "Epoch detail title").toHaveText("Epoch Details");
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

  const checkBlockOverviewDetailPage = async ({ blockFrostBlock }: { blockFrostBlock: BlockInformationDto }) => {
    await expect(blocksDetailHeader, "Block detail title").toHaveText("Block Details");

    expect(
      moment((await blocksDetailCreateTime.textContent())?.replace(",", "")).unix(),
      "Block create time to equal create time epoch Blockfrost"
    ).toEqual(blockFrostBlock?.time);

    expect(
      +((await blocksDetailConfirmation.textContent()) || 0),
      "Confirmation in block  to greate or equal confirmation in Blockfrost"
    ).toBeGreaterThanOrEqual(blockFrostBlock?.confirmations);

    expect(
      +((await blocksDetailTotalTrx.textContent()) || 0),
      "Total transaction in block to greate or equal total transaction in Blockfrost"
    ).toBeGreaterThanOrEqual(blockFrostBlock?.confirmations);

    expect(
      +((await blocksDetailTrxFee.textContent())?.replaceAll(",", "") || 0) * 10 ** 6,
      "Total fees in block detail to equal total fee in block on Blockfrost "
    ).toEqual(+(blockFrostBlock?.fees || 0));

    expect(
      +((await blocksDetailOutput.textContent())?.replaceAll(",", "") || 0) * 10 ** 6,
      "Total output in block detail to equal total output in block on Blockfrost "
    ).toEqual(+(blockFrostBlock?.output || 0));
  };

  const checkTransactionsTable = async () => {
    await expect(blocksDetailTrxTableTxhash, "Check title on transaction table").toHaveText("Tx hash");
    await expect(blocksDetailTrxTableCreatedAt, "Check title on transaction table").toHaveText("Created At");
    await expect(blocksDetailTrxTableAddress, "Check title on transaction table").toHaveText("Addresses");
    await expect(blocksDetailTrxTableFees, "Check title on transaction table").toHaveText("Fees");
    await expect(blocksDetailTrxTableoutput, "Check title on transaction table").toHaveText("Output in ADA");
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

  const checkTransactionsDetail = async () => {
    const url = await page.url();
    await expect(deatailPageTitle, "Check title on transaction detail").toHaveText("Transaction Details");
    expect(url, "Check url transaction detail").toContain("/transaction/");
  };

  const checkAddressDetail = async () => {
    const url = await page.url();
    await expect(addressDetailTitle, "Check title on address detail").toHaveText("Address Details");
    expect(url, "Check url address detail").toContain("/address/");
  };

  const checkPoolDetail = async () => {
    const url = await page.url();
    expect(url, "Check url pool detail").toContain("/pool/");
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
    checkBlockOverviewDetailPage,
    checkTransactionsTable,
    goToBlockDetailFromBlockNo,
    goToEpochDetailFromEpochNo,
    goToBlockDetailFromBlockId,
    checkEpochDetailPage,
    checkBlockWidget,
    goToBlockDetailFromWidgetByBlockHash,
    goToTrxDetailFromTrxTable,
    checkTransactionsDetail,
    goToAddressDetailFromTrxTable,
    checkAddressDetail,
    goToBlockDetailFromWidgetByTrxTab,
    checkPoolDetail,
    goToPoolDetailByBlockProducer
  };
}
