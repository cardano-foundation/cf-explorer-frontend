import type { APIRequestContext } from "@playwright/test";
import * as process from "process";

import * as BaseApi from "../base.api";
import * as Endpoint from "../../helpers/endpoints";

const MICA_TOKEN = process.env.MICA_API_TOKEN as string;

export function micaApi(request: APIRequestContext) {
  const getMicaIndicator = async (micarIndicator: string) => {
    return BaseApi.getData(
      request,
      Endpoint.Mica.Indicator.micaIndicator.replace(":indicator", micarIndicator),
      {
        responseType: "recent"
      },
      {
        accept: "applications/json",
        key: MICA_TOKEN
      },
      false
    );
  };

  return {
    getMicaIndicator
  };
}
