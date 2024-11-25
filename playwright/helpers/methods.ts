import { APIRequestContext } from "@playwright/test";

import { CardanoMicaIndicatorsDto } from "../api/dtos/cardanoMicaIndicatorsDto";
import { micaService } from "../api/call-mica/mica.service";

const cardanoIndicators: CardanoMicaIndicatorsDto = {} as CardanoMicaIndicatorsDto;
export function Methods() {
  const getTimeAndDateFromEpoch = async (epoch: number) => {
    const date = new Date(epoch * 1000); // Convert seconds to milliseconds
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month starts from 0
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
  };
  const getNumberFromStringWithNDecimals = async (stringNumber: string, numberOfDecimals: number) => {
    return parseFloat(stringNumber.slice(0, -numberOfDecimals) + "." + stringNumber.slice(-numberOfDecimals));
  };

  const getCardanoMicaIndicators = async (request: APIRequestContext) => {
    cardanoIndicators.energyConsumption = (
      await (await micaService(request)).getMicarIndicator("indicator-1")
    ).result.value.toString();
    cardanoIndicators.renewableEnergy = (
      await (await micaService(request)).getMicarIndicator("indicator-2")
    ).result.value.toFixed(2);
    cardanoIndicators.energyIntensity = (
      await (await micaService(request)).getMicarIndicator("indicator-3")
    ).result.value.toString();
    cardanoIndicators.ghgEmissionsSc1 = (
      await (await micaService(request)).getMicarIndicator("indicator-4")
    ).result.value.toString();
    cardanoIndicators.ghgEmissionsSc2 = (
      await (await micaService(request)).getMicarIndicator("indicator-5")
    ).result.value.toString();
    cardanoIndicators.ghgIntensity = (
      await (await micaService(request)).getMicarIndicator("indicator-6")
    ).result.value.toString();
    return cardanoIndicators;
  };
  return {
    getTimeAndDateFromEpoch,
    getNumberFromStringWithNDecimals,
    getCardanoMicaIndicators
  };
}
