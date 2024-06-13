import { expect, Page } from "@playwright/test";
import moment from "moment";

import { Methods } from "../helpers/methods";
import { BlockInformationDto } from "../api/dtos/blockInformation.dto";

export function blockDetailPage(page: Page) {
  const blockId = page.getByTestId("ellipsis-text");
  const blockCreateAt = page.getByTestId("detailHeader.value").nth(0);
  const blockTransactionsCount = page.getByTestId("detailHeader.value").nth(2);
  const epochNumber = page.locator('div[data-test-id="CircularProgressbarWithChildren__children"] > a');
  const blockSlotData = page.getByTestId("detailHeader.value").nth(6);
  const blockNumber = page.getByTestId("detailHeader.value").nth(5);
  const blockTotalOutput = page.getByTestId("detailHeader.value").nth(4);
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

  const goToPoolDetailByBlockProducer = async () => {
    await blocksDetailProducer.click();
  };

  const goToTrxDetailFromTrxTable = async () => {
    await blocksDetailTrxTableValueTrx.click();
  };

  const goToAddressDetailFromTrxTable = async () => {
    await blocksDetailTrxTableValueInputAddress.click();
  };

  const assertBlockDataIsDisplayed = async (lastBlockDataApi: Promise<BlockInformationDto>) => {
    await expect(blockId, "The block id is not the expected for the current block details").toHaveText(
      (
        await lastBlockDataApi
      ).hash
    );
    const convertedTime = Methods().getTimeAndDateFromEpoch((await lastBlockDataApi).time);
    const expectedTime = await blockCreateAt.textContent();
    expect(
      expectedTime?.replace(",", ""),
      "The block created date is not the expected for the current block details"
    ).toEqual(await convertedTime);
    await expect(
      blockTransactionsCount,
      "The block transactions count is not the expected for the current block details"
    ).toHaveText((await lastBlockDataApi).tx_count.toString());
    await expect(epochNumber, "The block's epoch number is not the expected for the current block details").toHaveText(
      (await lastBlockDataApi).epoch.toString()
    );
    const fullSlotData = (await lastBlockDataApi).epoch_slot + " - " + (await lastBlockDataApi).slot;
    await expect(blockSlotData, "The slot data is not is not the expected for the current block details").toHaveText(
      fullSlotData
    );
    await expect(blockNumber, "The block number is not is not the expected for the current block details").toHaveText(
      (await lastBlockDataApi).height.toString()
    );
    const totalOutput = await blockTotalOutput.textContent();
    expect(
      (await lastBlockDataApi).output.replace(/0$/, ""),
      "The block's total output is not the expected for the current block details"
    ).toEqual(totalOutput?.replace(/[,.]/g, "").trim());
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

  return {
    assertBlockDataIsDisplayed,
    checkBlockOverviewDetailPage,
    checkTransactionsTable,
    goToTrxDetailFromTrxTable,
    goToAddressDetailFromTrxTable,
    goToPoolDetailByBlockProducer
  };
}
