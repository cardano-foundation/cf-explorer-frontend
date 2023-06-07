import StyledModal from "../commons/StyledModal";
import { ContentContainer, NormalDescription, WrapContent } from "./styles";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
}
export function DeregistrationDelegatorProcessDescription({ open, handleCloseModal }: Props) {
  return (
    <StyledModal
      contentStyle={{ paddingRight: "5px" }}
      title="Deregistration"
      handleCloseModal={handleCloseModal}
      open={open}
    >
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            The stake address deregistration certificate contains the stake address that should be deregistered.
            Registering a stake address creates a corresponding reward account, which is deleted when the stake address
            is deregistered. The hold paid during registration is then released.
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}
