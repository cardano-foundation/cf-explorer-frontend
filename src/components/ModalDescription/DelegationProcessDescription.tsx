import { Box } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { BoxDetails, NormalDescription, NumberParagraph, Watermark, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}

export function DelegationProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal
      title='The delegation process'
      handleCloseModal={handleCloseModal}
      open={open}
      data-testid='close-modal-button'
    >
      <WrapContent>
        <NormalDescription>
          When a delegator wants to send ADA to a Staking Pool Operator (SPO) on Cardano, the following steps occur:
        </NormalDescription>
        <BoxDetails>
          <Watermark>foR illustration only</Watermark>
          <NormalDescription>
            <NumberParagraph>1.</NumberParagraph>
            The delegator selects the staking pool they wish to delegate their funds to. This can be done through a
            wallet or a staking service.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>2.</NumberParagraph>
            The delegator then sends their ADA to the staking pool's address. This can be done through their wallet or a
            staking service.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>3.</NumberParagraph>
            The staking pool operator receives the ADA and adds it to the staking pool's balance. The delegator's funds
            are now considered "delegated" and the delegator is now eligible to receive rewards from the staking pool.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>4.</NumberParagraph>
            The staking pool operator generates a staking certificate for the delegator, which is essentially a proof of
            the delegation of funds. This certificate is stored on the Cardano blockchain and serves as a record of the
            delegation.
          </NormalDescription>
          <NormalDescription>
            <NumberParagraph>5.</NumberParagraph>
            The delegator can then use the staking certificate to verify their delegation and claim rewards. The
            certificate can also be used to prove ownership of the staked ADA, which is useful in case of a dispute.
          </NormalDescription>
        </BoxDetails>
        <NormalDescription>
          In summary, sending ADA to a SPO on Cardano is the first step in the staking process. The delegator's funds
          are added to the staking pool's balance and a staking certificate is generated as proof of delegation.{" "}
        </NormalDescription>
      </WrapContent>
    </StyledModal>
  );
}
