import type { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

import { BlockfrostEpochInformationDto } from "../dtos/blockfrostEpochInformation.dto";
import { blockfrostApi } from "./blockfrost.api";
import { HttpStatusCode } from "../../helpers/http-status-codes";
import { BlockInformationDto } from "../dtos/blockInformation.dto";

export async function blockfrostService(request: APIRequestContext) {
  const getLastBlockData = async () => {
    const blockResponse = await blockfrostApi(request).getLatestBlockData();
    expect(blockResponse.status()).toEqual(HttpStatusCode.Ok);
    const blockData: BlockInformationDto = await blockResponse.json();
    return blockData;
  };
  const getLastEpochData = async () => {
    const epochResponse = await blockfrostApi(request).getLastEpochData();
    expect(epochResponse.status()).toEqual(HttpStatusCode.Ok);
    const epochData: BlockfrostEpochInformationDto = await epochResponse.json();
    return epochData;
  };

  const getLastFinishedEpochId = async () => {
    const epochData = await blockfrostApi(request).getLastEpochData();
    expect(epochData.status()).toEqual(HttpStatusCode.Ok);
    const finishedEpochId = (await epochData.json()).epoch;
    return finishedEpochId - 1;
  };

  const getEpochById = async (epochId: number) => {
    const epochResponse = await blockfrostApi(request).getEpochById(epochId);
    expect(epochResponse.status()).toEqual(HttpStatusCode.Ok);
    const epochData: BlockfrostEpochInformationDto = await epochResponse.json();
    return epochData;
  };

  const getBlockByNumber = async (blockNumber: number) => {
    const blockResponse = await blockfrostApi(request).getBlockByNumber(blockNumber);
    expect(blockResponse.status()).toEqual(HttpStatusCode.Ok);
    const blockData: BlockInformationDto = await blockResponse.json();
    return blockData;
  };

  return {
    getLastBlockData,
    getLastEpochData,
    getLastFinishedEpochId,
    getEpochById,
    getBlockByNumber
  };
}
