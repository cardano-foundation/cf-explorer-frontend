import type { APIRequestContext } from "@playwright/test";
import * as process from "process";

import * as BaseApi from "../base.api";
import * as Endpoint from "../../helpers/endpoints";

const KOIOS_TOKEN = process.env.KOIOS_API_TOKEN as string;
export function koiosApi(request: APIRequestContext) {
  const getEpochById = async (epochId: number) => {
    return BaseApi.getData(
      request,
      Endpoint.Koios.getEpochById.Base,
      {
        _epoch_no: epochId,
        _include_next_epoch: false
      },
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        authorization: KOIOS_TOKEN
      },
      false
    );
  };

  const getTransactionByTrxHash = async (trxHash: string) => {
    return BaseApi.postData(
      request,
      Endpoint.Koios.Transactions.Base,
      {
        _tx_hashes: [trxHash]
      },
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        authorization: KOIOS_TOKEN
      }
    );
  };

  const getAddress = async (address: string) => {
    return BaseApi.postData(
      request,
      Endpoint.Koios.getAddress.Base,
      {
        _addresses: [address]
      },
      {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        authorization: KOIOS_TOKEN
      }
    );
  };

  return {
    getEpochById,
    getTransactionByTrxHash,
    getAddress
  };
}
