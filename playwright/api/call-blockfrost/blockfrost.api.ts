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

  const getBlockByHash = async (blockHash: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Blocks.Base + `/${blockHash}`,
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

  const getListPools = async ({ count, page }: { count: number; page: number }) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Pools.Base + `?count=${count}&page=${page}`,
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

  const getStakePools = async (poolId: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Pools.Base + `/${poolId}`,
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

  const getMetadataPools = async (poolId: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Pools.Base + `/${poolId}/metadata`,
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

  const getHistoryPools = async (poolId: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Pools.Base + `/${poolId}/history?count=1&page=1`,
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
    getBlockByNumber,
    getBlockByHash,
    getListPools,
    getStakePools,
    getMetadataPools,
    getHistoryPools
  };
}
