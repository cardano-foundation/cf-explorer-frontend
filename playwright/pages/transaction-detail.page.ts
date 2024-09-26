import { expect, Page } from "@playwright/test";

import {
  TrxContract,
  TrxDelegationCert,
  TrxDeregisPoolCert,
  TrxInstantaneousReward,
  TrxRegisPoolCert,
  TrxStakeCert
} from "playwright/api/dtos/transaction.dto";

export function transactionDetailPage(page: Page) {
  // Contract Tab
  const trxContractTab = page.getByTestId("transactionMetadata.contracts");
  const trxContractAddress = page.getByTestId("trxdetail.contract.address#0");
  const trxContractDetailBtn = page.getByTestId("trxdetail.contract.bth.detai#0");
  const trxContractDetailAddress = page.getByTestId("trx.contract.detail.address");

  // Stake Cert Tab
  const trxStakeCertTab = page.getByTestId("transactionMetadata.stakeCertificates");
  const trxStakeAddress = page.getByTestId("trx.stake.cert.address#0");

  // Minting Tab
  const trxMintingTab = page.getByTestId("transactionMetadata.mints");
  const trxMintingNameTitle = page.getByTestId("trx.minting.title.name");
  const trxMintingAmountTitle = page.getByTestId("trx.minting.title.amount");
  const trxMintingPolicyTitle = page.getByTestId("trx.minting.title.policyScript");

  // Pool Cert Tab
  const trxPoolCertTab = page.getByTestId("transactionMetadata.poolCertificates");
  const trxPoolCertId = page.getByTestId("trx.pool.cert.id#0");
  const trxPoolCertVRFKey = page.getByTestId("trx.pool.cert.vrfKey#0");
  const trxPoolCertRewardAccoount = page.getByTestId("trx.pool.cert.rewardAccount#0");
  const trxPoolCertPoolOperator = page.getByTestId("trx.pool.cert.poolOperator#0");
  const trxPoolCertMargin = page.getByTestId("trx.pool.cert.margin#0");
  const trxPoolCertCost = page.getByTestId("trx.pool.cert.cost#0");
  const trxPoolCertPledge = page.getByTestId("trx.pool.cert.pledge#0");
  const trxDeregisPoolCertId = page.getByTestId("trx.deregis.pool.id#0");
  const trxDeregisPoolCertEpoch = page.getByTestId("trx.deregis.pool.epoch#0");

  // Delegation Tab
  const trxDelegationTab = page.getByTestId("transactionMetadata.delegations");
  const trxDelegationAdress = page.getByTestId("trx.detail.delegation.address#0");
  const trxDelegationPoolId = page.getByTestId("trx.detail.delegation.poolId#0");

  // Instantaneous Rewards Tab
  const trxInstantaneousRewardsTab = page.getByTestId("transactionMetadata.instantaneousRewards");
  const trxInstantaneousRewardsAddress = page.getByTestId("trx.detail.instantaneous.address#0");
  const trxInstantaneousRewardsAmount = page.getByTestId("trx.detail.instantaneous.amount#0");

  const checkTransactionsDetail = async ({ transactionHash }: { transactionHash: string | null }) => {
    const deatailPageTitle = page.getByTestId("detail.page.title");

    const url = await page.url();
    await expect(deatailPageTitle, "Check title on transaction detail").toHaveText("Transaction Details");
    expect(url, "Check url transaction detail").toContain(`${transactionHash}`);
  };

  const checkContractList = async ({ data }: { data: TrxContract[] | null }) => {
    const firstPathAdress = await trxContractAddress.innerText();
    const contractData = data?.find((i) => i.script_hash.includes(firstPathAdress));
    expect(contractData).toBeTruthy();
  };

  //To Do
  const checkContractDetail = async ({ data }: { data: TrxContract[] | null }) => {
    const contractAddress = await trxContractDetailAddress?.getAttribute("aria-label");
    const contractData = data?.find((i) => i.script_hash.includes(contractAddress || ""));
    expect(contractAddress).toEqual(contractData?.script_hash);
  };

  const checkStakeCertTab = async ({ data }: { data: TrxStakeCert[] | null }) => {
    const firstPathAdress = await trxStakeAddress.innerText();
    const contractData = data?.find((i) => i.address.includes(firstPathAdress));
    expect(contractData?.address).toContain(firstPathAdress);
  };

  const checkMintingTab = async () => {
    expect(await trxMintingNameTitle.innerText()).toEqual("Asset name");
    expect(await trxMintingAmountTitle.innerText()).toEqual("Amount minted");
    expect(await trxMintingPolicyTitle.innerText()).toEqual("Policy Script");
  };

  const checkRegisPoolCertTab = async ({ data }: { data: TrxRegisPoolCert[] | null }) => {
    const firstPathPoolId = await trxPoolCertId.innerText();
    const poolData = data?.find((i) => i.pool_id.includes(firstPathPoolId));

    expect(poolData?.vrf_key).toContain(await trxPoolCertVRFKey.innerText());
    expect(poolData?.reward_account).toContain(await trxPoolCertRewardAccoount.innerText());
    expect(poolData?.owners.find(async (i) => i.includes(await trxPoolCertPoolOperator.innerText()))).toBeTruthy();
    expect(`${(poolData?.margin_cost || 0) * 100}%`).toContain(await trxPoolCertMargin.innerText());
    expect(+((await trxPoolCertCost.innerText()) || "").replaceAll(",", "") * 10 ** 6).toEqual(
      +(poolData?.fixed_cost || 0)
    );
    expect(+((await trxPoolCertPledge.innerText()) || "").replaceAll(",", "") * 10 ** 6).toEqual(
      +(poolData?.pledge || 0)
    );
  };

  const checkDeregisPoolCertTab = async ({ data }: { data: TrxDeregisPoolCert[] | null }) => {
    const firstPathPoolId = await trxDeregisPoolCertId.innerText();
    const poolData = data?.find((i) => i.pool_id.includes(firstPathPoolId));
    expect(poolData?.pool_id).toContain(await trxDeregisPoolCertId.innerText());
    expect(poolData?.retiring_epoch).toEqual(+((await trxDeregisPoolCertEpoch.innerText()) || 0));
  };

  const checkDelegationTab = async ({ data }: { data: TrxDelegationCert[] | null }) => {
    const firstPathAddress = await trxDelegationAdress.innerText();
    const delegationData = data?.find((i) => i.address.includes(firstPathAddress));
    expect(delegationData?.pool_id).toContain(await trxDelegationPoolId.innerText());
    expect(delegationData?.address).toContain(await trxDelegationAdress.innerText());
  };

  const checkInstantaneousRewardTab = async ({ data }: { data: TrxInstantaneousReward[] | null }) => {
    const firstPathAddress = await trxInstantaneousRewardsAddress.innerText();
    const instantaneousRewardData = data?.find((i) => i.address.includes(firstPathAddress));
    expect(instantaneousRewardData?.address).toContain(await trxInstantaneousRewardsAddress.innerText());
    expect(+((await trxInstantaneousRewardsAmount.innerText()) || "").replaceAll(",", "") * 10 ** 6).toEqual(
      +(instantaneousRewardData?.amount || 0)
    );
  };

  const goToTracsactionDetailWithHash = async ({ transactionHash }: { transactionHash: string }) => {
    await page.goto(`/transaction/${transactionHash}`, { waitUntil: "load", timeout: 60000 });
  };

  const openContractDetail = async () => {
    await trxContractDetailBtn.click();
  };

  const openContractTab = async () => {
    await trxContractTab.click();
  };

  const openMintingTab = async () => {
    await trxMintingTab.click();
  };

  const openStakeCertTab = async () => {
    await trxStakeCertTab.click();
  };

  const openPoolCertTab = async () => {
    await trxPoolCertTab.click();
  };

  const openDelegationTab = async () => {
    await trxDelegationTab.click();
  };

  const openInstantaneousRewardsTab = async () => {
    await trxInstantaneousRewardsTab.click();
  };

  return {
    checkContractDetail,
    checkContractList,
    checkDelegationTab,
    checkInstantaneousRewardTab,
    checkMintingTab,
    checkStakeCertTab,
    checkTransactionsDetail,
    checkRegisPoolCertTab,
    checkDeregisPoolCertTab,
    openContractTab,
    openContractDetail,
    openDelegationTab,
    openInstantaneousRewardsTab,
    openMintingTab,
    openStakeCertTab,
    openPoolCertTab,
    goToTracsactionDetailWithHash
  };
}
