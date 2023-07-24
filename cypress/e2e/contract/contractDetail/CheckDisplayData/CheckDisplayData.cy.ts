import ContractPage from "cypress/pagesobject/Contract/ContractPage";

const contractPage = new ContractPage();
describe('Check display data of the "Contract details" section',()=>{
beforeEach(() => {
    contractPage.goToContractPage()
                .clickOnContractRecordRandomly();
  })

it('Check display data of the "Transaction" label', () => {
    contractPage.verifyTransactionDetail()
});
it('Check display data of the "ADA Balance" label', () => {
    contractPage.verifyADABalanceDetail()
});

it('Check fomat of the"ADA Balance"', () => {
    contractPage.verifyContractDetailFormat('ADA Balance')
});

it('Check display data of the "ADA Value" label"', () => {
    contractPage.verifyADAValueDetail()
});

it('Check display data of the "Controlled stake key"', () => {
    contractPage.verifyControlledStakeDetail()
});

it('Check display data of the "Controlled Total Stake" label format', () => {
    contractPage.verifyContractDetailFormat('Controlled Total Stake')
});

it('Check display data of the "Reward available" label', () => {
    contractPage.verifyRewardAvailableDetail()
});

it('Check fomat of the " Reward available"', () => {
    contractPage.verifyContractDetailFormat('Reward Available')
});

it('Check display data of the "Reward withdrawn" label', () => {
    contractPage.verifyRewardWithdrawDetail()
});

it('Check fomat of the " Reward withdrawn"', () => {
    contractPage.verifyContractDetailFormat('Reward Withdrawn')
});

it('Check display data of the "Delegated To" label', () => {
    contractPage.verifyDelegatedToDetail()
});


})