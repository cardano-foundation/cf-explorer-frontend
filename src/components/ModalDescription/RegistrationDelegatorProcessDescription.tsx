import { Typography } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";
interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function RegistrationDelegatorProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal title='Registration' handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>
              An ADA holder that wants to participate in the Proof of Stake consensus mechanism on the Cardano
              blockchain by delegating their ADA, must go through a process that involves registering a{" "}
              <span>stake address</span>. This is done by posting a so-called “stake address registration certificate”
              to the Cardano blockchain. This registration allows an ADA holder to delegate ADA and automatically sets
              up a rewards address where the Cardano blockchain accrues the rewards from such delegation (see Delegation
              and Rewards Collection).
            </Typography>
            <Typography mt={1}>
              Technically such a registration is required because delegation on the Cardano blockchain involves
              distinguishing between the <span>transaction of ADA</span> and
              <span> the participation of the same ADA</span> in the consensus mechanism. This distinction is achieved
              by modelling it in the address structure and distinguishing between payment address and stake address. ADA
              is always linked to a payment address but can <span> optionally </span>
              also be associated with a stake address. This allows the ADA holder to exercise staking or delegate it to
              a stake pool selected by the ADA holder.
            </Typography>
            <Typography mt={1}>
              To mitigate certain economic attacks, a refundable hold is imposed on the ADA holder upon registration,
              which is released when the stake address is deregistered. The hold covers the costs of tracking the stake
              address and maintaining the corresponding rewards account, and it incentivises deregistering unused stake
              addresses so that the corresponding Cardano blockchain resources can be released.
            </Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
