import { Box, alpha, styled } from "@mui/material";

export const NormalDescription = styled(Box)`
  position: relative;
  font-weight: 400;
  line-height: 21px;
  z-index: 2;
  font-size: 14px;
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
      background: ${(props) => props.theme.palette.grey[300]};
    }
    &::-webkit-scrollbar-track {
      background: ${(props) => props.theme.palette.grey[100]};
    }
  }
`;

export const ContentContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
`;

export const Watermark = styled("span")`
  position: absolute;
  z-index: 1;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 1;
  max-height: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  &::after {
    content: "FOR \\a ILLUSTRION \\a ONLY";
    white-space: pre;
    z-index: 1;
    width: max-content;
    font-weight: 900;
    font-size: 80px;
    line-height: 94px;
    text-align: center;
    text-transform: uppercase;
    color: #e9eaec;
    transform: rotate(45deg);
    ${({ theme }) => theme.breakpoints.down("sm")} {
      font-size: 50px;
      line-height: 59px;
    }
  }
`;

export const BoxDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const BoxDetails = styled(BoxDescription)`
  background: ${(props) => alpha(props.theme.palette.grey[300], 0.1)};
  padding: 20px 25px;
  padding-left: 35px;
  margin: 15px 0px;
  position: relative;
`;
