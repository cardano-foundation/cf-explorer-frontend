import { Typography } from "@mui/material";

import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}

export function DelegationProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal title="Delegation" handleCloseModal={handleCloseModal} open={open} data-testid="close-modal-button">
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>
              An ADA holder can delegate from their stake address to a stake pool by posting a so-called “delegation
              certificate” to the Cardano blockchain. If an ADA holder wishes to change their choice of stake pool, they
              are free to post a new delegation certificate at any time.
            </Typography>
            <Typography mt={1}>
              Technically a delegation certificate contains the stake address delegating its stake rights and the stake
              pool verification key hash to which the stake is delegated. If a source stake address is deregistered (see
              Deregistration), the associated delegation certificate is automatically revoked. Newer delegation
              certificates supersede older delegation certificates.
            </Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
