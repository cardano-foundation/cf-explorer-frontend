import { Page } from "@playwright/test";

export function smartContractlPage(page: Page) {
  const scriptHashCard = page.getByTestId("nativeScripts.smartContract.card.scriptHashValue#5");

  const goToSmartContractPage = async () => {
    await page.goto("/native-scripts-sc/smart-contracts");
  };

  const goToSmartContractDetail = async () => {
    await scriptHashCard.click();
  };

  return { goToSmartContractPage, goToSmartContractDetail };
}
