import { expect, Page } from "@playwright/test";

import { CardanoMicaIndicatorsDto } from "../api/dtos/cardanoMicaIndicatorsDto";

export function sustainabilityPage(page: Page) {
  const calculatorSearchField = page.locator("input[placeholder='Search Stake ID or Address']");
  const calculatorSearchButton = page.locator("div[class='MuiBox-root css-zs3kdo']");
  const stakeAddressResult = page.locator("a[class='css-1l62pou']");
  const stakeAddressTx = page.locator("p[class='MuiTypography-root MuiTypography-body1 css-1auqav']").first();
  const indicators = page.locator("p[class='MuiTypography-root MuiTypography-body1 css-aug750']");

  const openSustainabilityPage = async () => {
    await page.goto("/micar");
  };
  const calculateEmissionsForStakeAddress = async (stakeAddressId: string) => {
    await calculatorSearchField.fill(stakeAddressId);
    await calculatorSearchButton.click();
  };

  const checkEmissionsResultForStakeAddress = async (stakeAddressId: string, totalTx: string) => {
    await stakeAddressResult.isVisible();
    expect(
      await stakeAddressResult.textContent(),
      "The result for the Emissions calculator should have" + "the searched stake address"
    ).toEqual(stakeAddressId);
    expect(await stakeAddressTx.textContent(), "The Stake address transactions are not the expected").toEqual(totalTx);
  };

  const checkMicarIndicators = async (cardanoIndicators: CardanoMicaIndicatorsDto) => {
    expect(cardanoIndicators.energyConsumption, "The energy consumption is not the expected").toContain(
      (await indicators.nth(0).textContent())?.replace(/[a-zA-Z,\s]/g, "")
    );
    expect(cardanoIndicators.renewableEnergy, "The renewable energy is not the expected").toContain(
      (await indicators.nth(1).textContent())?.replace(/[a-zA-Z%\s]/g, "")
    );
    expect(cardanoIndicators.energyIntensity, "The energy intensity is not the expected").toContain(
      (await indicators.nth(2).textContent())?.replace(/[a-zA-Z\s]/g, "")
    );
    expect(cardanoIndicators.ghgEmissionsSc1, "The GHG Emissions scope 1 is not the expected").toContain(
      (await indicators.nth(3).textContent())?.replace(/[a-zA-Z\s]/g, "")
    );
    expect(cardanoIndicators.ghgEmissionsSc2, "The GHG Emissions scope 1 is not the expected").toContain(
      (await indicators.nth(4).textContent())?.replace(/[a-zA-Z\s]/g, "")
    );
    expect(cardanoIndicators.ghgIntensity, "The GHG Emissions scope 1 is not the expected").toContain(
      (await indicators.nth(5).textContent())?.replace(/[a-zA-Z\s]/g, "")
    );
  };

  return {
    openSustainabilityPage,
    calculateEmissionsForStakeAddress,
    checkEmissionsResultForStakeAddress,
    checkMicarIndicators
  };
}
