import { Typography } from "@mui/material";
import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";
interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function DeregistrationSPOProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal title='Deregistration' handleCloseModal={handleCloseModal} open={open}>
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>
              If a stake pool wishes to cease operation, it can announce this intention by posting a stake pool
              retirement certificate.
            </Typography>
            <Typography mt={1}>
              The Stake Pool Retirement Certificate contains the public key hash of the pool and the epoch number,
              starting from which the stake pool will cease operation.
            </Typography>
            <Typography mt={1}>
              After the retirement epoch, any stake delegated to this stake pool will be disregarded and will not
              participate in the consensus mechanism.
            </Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
