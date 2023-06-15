import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function WithdrawingFundProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal
      contentStyle={{ paddingRight: "5px" }}
      title="Reward withdrawal"
      handleCloseModal={handleCloseModal}
      open={open}
    >
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            Rewards on a reward account can be withdrawn to a payment address at any time by using the reward account as
            an input to a transaction. This transaction follows the Unspent-Transaction-Output (UTXO) architecture,
            taking the current balance of the reward account as the input amount.
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
