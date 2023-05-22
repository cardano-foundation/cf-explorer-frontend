import StyledModal from "../commons/StyledModal";
import { BoxDetails, ContentContainer, NormalDescription, NumberParagraph, Watermark, WrapContent } from "./styles";
interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function DeregistrationProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal title='The deregistration process' handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            When a delegator wants to deregister from staking on Cardano, the following steps occur:
          </NormalDescription>
          <BoxDetails>
            <Watermark />
            <NormalDescription>
              <NumberParagraph>1.</NumberParagraph>
              The delegator initiates a deregistration request in their wallet or through a staking service.
            </NormalDescription>
            <NormalDescription>
              <NumberParagraph>2.</NumberParagraph>
              The Cardano protocol verifies that the delegator has enough available funds to cover the transaction fees
              and any outstanding obligations to the staking pool.
            </NormalDescription>
            <NormalDescription>
              <NumberParagraph>3.</NumberParagraph>
              The Cardano protocol then creates a deregistration certificate that specifies the delegator's intention to
              deregister.
            </NormalDescription>
            <NormalDescription>
              <NumberParagraph>4.</NumberParagraph>
              The deregistration certificate is broadcast to the network and included in the blockchain, indicating that
              the delegator is no longer participating in the staking pool.
            </NormalDescription>
            <NormalDescription>
              <NumberParagraph>5.</NumberParagraph>
              After a period of time, which is currently set to 2 epochs or approximately 5 days, the delegation to the
              staking pool is considered to be fully withdrawn.
            </NormalDescription>
            <NormalDescription>
              <NumberParagraph>6.</NumberParagraph>
              The delegator's funds are then available for withdrawal or re-delegation to another staking pool.
            </NormalDescription>
          </BoxDetails>
          <NormalDescription>
            It's important to note that a delegator should only initiate a deregistration request if they are sure they
            no longer want to participate in staking on Cardano. Once a delegation has been deregistered, it cannot be
            reversed, and the delegator will need to go through the process of re-delegating or withdrawing their funds
            if they wish to participate in staking again. In summary, when a delegator wants to deregister from staking
            on Cardano, they initiate a deregistration request which creates a deregistration certificate that is
            broadcast to the network. After a period of time, the delegation is considered to be fully withdrawn, and
            the delegator's funds are available for withdrawal or re-delegation.
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
