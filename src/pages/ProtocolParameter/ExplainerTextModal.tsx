import { Typography, Box, styled } from "@mui/material";

import StyledModal from "src/components/commons/StyledModal";

interface Props {
  open: boolean;
  handleCloseModal: () => void;
  explainerText: { content: string; title: string };
}

export function ExplainerTextModal({ open, handleCloseModal, explainerText }: Props) {
  return (
    <StyledModal
      title={explainerText?.title || ""}
      handleCloseModal={handleCloseModal}
      open={open}
      data-testid="close-modal-button"
    >
      <WrapContent>
        <ContentContainer>
          <NormalDescription>
            <Typography>{explainerText?.content || ""}</Typography>
          </NormalDescription>
        </ContentContainer>
      </WrapContent>
    </StyledModal>
  );
}

const NormalDescription = styled(Box)`
  position: relative;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.secondary.light};
  line-height: 21px;
  z-index: 2;
  font-size: 16px;
  & span {
    font-weight: 700;
  }
  padding-right: 8px;
`;
const ContentContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
`;
const WrapContent = styled(Box)`
  max-height: calc(100vh - 220px);
  width: 600px;
  max-width: 100%;
  position: relative;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.palette.secondary.light};
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.palette.grey[100]};
    }
  }
`;
