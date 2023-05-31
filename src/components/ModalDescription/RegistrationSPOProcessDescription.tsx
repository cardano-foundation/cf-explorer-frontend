import { Typography } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";
interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function RegistrationSPOProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal title="Registration" handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>
              Anyone who plans to operate a stake pool and thereby become a stake pool operator can declare this intent
              by posting a so-called “stake pool registration certificate to the blockchain. The certificate contains
              the parameters required to set up and operationalize the stake pool, such as operator and owner addresses,
              stake pool metadata, and reward-sharing parameters. Such parameters include but are not limited to cost,
              margin, and amount of stake pledged to the pool by the operator or owner (see below for more on this
              distinction). Click on the stake pool registration certificate for the full list of parameters.
            </Typography>
            <Typography mt={1}>
              Technically there is a difference between the stake pool operator and stake pool owner(s). The stake pool
              operator operates and monitors the pool by owning or renting a server to run the node and holding the
              key(s) to the pool. There is generally only one stake pool operator who holds the key to the stake pool
              itself that is used to sign blocks, retire a stake pool, update registration certificates and distribute
              rewards among the stake pool owners. The Stake Pool Owner pledges their staking authority to the pool,
              increasing its rewards and desirability. The ability for the owner to pledge stake mitigates against
              certain pool-level attacks (e.g. sybil). Often, the operator and owner will be the same party, but a stake
              pool can also have multiple owners. This allows multiple parties to coordinate to form a competitive stake
              pool, by combining the stake of the involved parties (owners), thereby increasing the total pledge.
            </Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
