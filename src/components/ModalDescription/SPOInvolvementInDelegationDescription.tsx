import { Typography } from "@mui/material";

import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}

export function SPOInvolvementInDelegationDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal
      contentStyle={{ paddingRight: "5px" }}
      title="Pool updates"
      handleCloseModal={handleCloseModal}
      open={open}
    >
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>
              At most, there can be one active stake pool registration certificate for each stake pool. An older
              certificate will be overridden by a newer one.
            </Typography>
            <Typography mt={1}>
              To adjust the costs and margin of the pool, a stake pool operator can replace the registration certificate
              of the pool with a new one. This allows operators to respond to changes, e.g. in the pool's operational
              costs.
            </Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
