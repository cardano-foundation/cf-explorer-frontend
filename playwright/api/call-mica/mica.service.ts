import type { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

import { micaApi } from "./mica.api";
import { HttpStatusCode } from "../../helpers/http-status-codes";
import { MicaIndicatorDto } from "../dtos/micaIndicator.dto";

export async function micaService(request: APIRequestContext) {
  const getMicarIndicator = async (indicator: string) => {
    const indicatorResponse = await micaApi(request).getMicaIndicator(indicator);
    expect(indicatorResponse.status()).toEqual(HttpStatusCode.Ok);
    const micarIndicatorData: MicaIndicatorDto = await indicatorResponse.json();
    return micarIndicatorData;
  };

  return {
    getMicarIndicator
  };
}
