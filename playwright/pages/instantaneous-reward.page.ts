import { Page } from "@playwright/test";

export function instantaneousReward(page: Page) {
  const goToInstantaneousRewardPage = async () => {
    await page.goto("/instantaneous-rewards");
  };

  return { goToInstantaneousRewardPage };
}
