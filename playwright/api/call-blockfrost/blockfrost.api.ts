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

  const getTrxContractByHash = async (trxHash: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Transaction.Contract.replace(":hash", trxHash),
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

  const getTrxStakeCertByHash = async (trxHash: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Transaction.StakeCert.replace(":hash", trxHash),
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

  const getTrxRegisPoolCertByHash = async (trxHash: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Transaction.RegisPoolCert.replace(":hash", trxHash),
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

  const getTrxDeregisPoolCertByHash = async (trxHash: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Transaction.DeregisPoolCert.replace(":hash", trxHash),
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

  const getTrxDelegationCertByHash = async (trxHash: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Transaction.DelegationCert.replace(":hash", trxHash),
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

  const getTrxInstantaneousRewardByHash = async (trxHash: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.Transaction.InstantaneousReward.replace(":hash", trxHash),
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

  const getAssetNameByAssetToken = async (assetToken: string | null) => {
    return BaseApi.getData(request, Endpoint.BlockFrost.Token.Base + `/${assetToken}`);
  };
  const getTxCountTopADAHolder = async (address: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.TopADAHolder.TxCount.replace(":address", address),
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

  const getDataAmountStaked = async (stakedAddress: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.TopADAHolder.dataTabAmountStaked.replace(":stake_address", stakedAddress),
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

  const getPoolIDAcount = async (stakedAddress: string) => {
    return BaseApi.getData(
      request,
      Endpoint.BlockFrost.TopADAHolder.poolIDAcount.replace(":stake_address", stakedAddress),
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
    getTrxContractByHash,
    getTrxStakeCertByHash,
    getTrxRegisPoolCertByHash,
    getTrxDeregisPoolCertByHash,
    getTrxDelegationCertByHash,
    getTrxInstantaneousRewardByHash,
    getListPools,
    getStakePools,
    getMetadataPools,
    getHistoryPools,
    getAssetNameByAssetToken,
    getTxCountTopADAHolder,
    getDataAmountStaked,
    getPoolIDAcount
  };
}
