import StyledModal from "../commons/StyledModal";
import { BoxDetails, ContentContainer, NormalDescription, Watermark, WrapContent } from "./styles";
interface Props {
  open: boolean;
  handleCloseModal: () => void;
}

export function SPOInvolvementInDelegationDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal title='The SPO’s involvement in delegation' handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <ContentContainer>
          <Watermark />
          <BoxDetails margin='0 !important'>
            <NormalDescription>
              In Cardano's staking system, Staking Pool Operators (SPOs) are not directly involved in delegation
              transactions. Instead, they listen to events on the Cardano blockchain to determine which addresses have
              delegated to their staking pool.
            </NormalDescription>
            <NormalDescription>
              When a delegator sends ADA to a staking pool's address, this transaction is recorded on the Cardano
              blockchain, but it does not directly involve the staking pool operator. The staking pool operator simply
              waits for the transaction to be included in a block and for the corresponding delegation certificate to be
              created.
            </NormalDescription>
            <NormalDescription>
              Once a delegation certificate is created, it is also recorded on the Cardano blockchain. The staking pool
              operator monitors the blockchain for these delegation certificates and uses them to update their internal
              records to reflect the delegator's participation in their staking pool.
            </NormalDescription>
            {/* <NormalDescription>
              The SPOs use this information to calculate the rewards earned by each delegator, and to distribute those
              rewards accordingly. They do not have direct control over the delegator's funds, nor do they participate
              in the delegation transaction itself.
            </NormalDescription>
            <NormalDescription>
              This separation of concerns between delegation transactions and staking pool operation is an important
              feature of Cardano's staking system. It ensures that staking pools are operated in a decentralized and
              transparent manner, and that delegators retain full control over their funds at all times.
            </NormalDescription> */}
          </BoxDetails>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
