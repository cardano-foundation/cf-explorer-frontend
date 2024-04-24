import type { APIRequestContext } from "@playwright/test";
import { expect } from "@playwright/test";

import { koiosApi } from "./koios.api";
import { KoiosEpochInformationDto } from "../dtos/koiosEpochInformation.dto";
import { HttpStatusCode } from "../../helpers/http-status-codes";

export async function koiosService(request: APIRequestContext) {
  const getEpochById = async (epochId: number) => {
    const epochData = await koiosApi(request).getEpochById(epochId);
    expect(epochData.status()).toEqual(HttpStatusCode.Ok);
    const epochArrayResponse: KoiosEpochInformationDto[] = await epochData.json();
    return epochArrayResponse;
  };

  return {
    getEpochById
  };
}
