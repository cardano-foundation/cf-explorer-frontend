import type { APIRequestContext } from "@playwright/test";
import * as process from "process";

import * as BaseApi from "../base.api";
import * as Endpoint from "../../helpers/endpoints";

const BLOCKFROST_TOKEN = process.env.BLOCKFROST_API_TOKEN as string;
export function blockfrostApi(request: APIRequestContext) {
  const getLatestBlockData = async () => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Blocks.Latest,
      {},
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        project_id: BLOCKFROST_TOKEN
      },
      false
    );
  };

  const getLastEpochData = async () => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Epochs.Latest,
      {},
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        project_id: BLOCKFROST_TOKEN
      },
      false
    );
  };

  const getEpochById = async (epochId: number) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Epochs.Base + `/${epochId}`,
      {},
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        project_id: BLOCKFROST_TOKEN
      },
      false
    );
  };

  const getBlockByNumber = async (blockNumber: number) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Blocks.Base + `/${blockNumber}`,
      {},
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        project_id: BLOCKFROST_TOKEN
      },
      false
    );
  };

  return {
    getLastEpochData,
    getLatestBlockData,
    getEpochById,
    getBlockByNumber
  };
}
