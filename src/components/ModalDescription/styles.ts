import { Box, alpha, styled } from "@mui/material";

export const NormalDescription = styled(Box)`
  color: ${(props) => props.theme.palette.secondary.light};
  position: relative;
  font-weight: 400;
  line-height: 21px;
  z-index: 2;
  font-size: 16px;
  & span {
    font-weight: 700;
  }
  padding-right: 8px;
`;
export const NumberParagraph = styled(Box)`
  position: absolute;
  left: -1em;
  text-align: right;
`;

//show overflow-y when hover
export const WrapContent = styled(Box)`
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
      background: ${(props) => props.theme.palette.primary[100]};
    }
  }
`;

export const ContentContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
`;

export const BoxDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const BoxDetails = styled(BoxDescription)`
  background: ${(props) => alpha(props.theme.palette.secondary.light, 0.1)};
  padding: 20px 25px;
  padding-left: 35px;
  margin: 15px 0px;
  position: relative;
`;
