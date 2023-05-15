import { Box } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { BoxDetails, NormalDescription, NumberParagraph, Watermark, WrapContent } from "./styles";
interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function WithdrawingFundProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal title='The withdrawing funds process' handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <NormalDescription>
          When a delegator wants to withdraw their funds from a staking pool on Cardano, the following steps occur:
        </NormalDescription>
        <BoxDetails>
          <Watermark
            sx={{
              top: "240px"
            }}
          >
            foR illustration only
          </Watermark>
          <NormalDescription>
            <NumberParagraph>1.</NumberParagraph>
            The delegator initiates a withdrawal request in their wallet or through a staking service.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>2.</NumberParagraph>
            The Cardano protocol verifies that the delegator has enough available funds to cover the transaction fees
            and the amount being withdrawn.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>3.</NumberParagraph>
            The Cardano protocol then creates a withdrawal certificate that specifies the amount to be withdrawn and the
            address to which the funds should be sent.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>4.</NumberParagraph>
            The withdrawal certificate is broadcast to the network and included in the blockchain, indicating that the
            funds are now available for withdrawal.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>5.</NumberParagraph>
            The delegator's funds are then transferred from the staking pool's account to the delegator's address
            specified in the withdrawal certificate.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>6.</NumberParagraph>
            The delegator can then see the withdrawn funds in their wallet or through a staking service.
          </NormalDescription>
        </BoxDetails>
        <NormalDescription>
          It's important to note that there may be a delay between the withdrawal request and the actual transfer of
          funds due to the nature of the Cardano blockchain. The exact time it takes for the withdrawal to complete
          depends on various factors such as network congestion and transaction fees. In summary, when a delegator wants
          to withdraw their funds from a staking pool on Cardano, the Cardano protocol is involved in verifying the
          transaction and creating a withdrawal certificate. Once the certificate is included in the blockchain, the
          funds are transferred to the delegator's address, and the withdrawal is complete.
        </NormalDescription>
      </WrapContent>
    </StyledModal>
  );
}
