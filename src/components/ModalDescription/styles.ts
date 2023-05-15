import { Box, alpha, styled } from "@mui/material";

export const NormalDescription = styled("span")`
  position: relative;
  font-weight: 400;
  line-height: 21px;
  z-index: 2;
  font-size: 14px;
`;
export const NumberParagraph = styled(Box)`
  position: absolute;
  left: -2em;
  text-align: right;
`;

export const WrapContent = styled(Box)`
  max-height: 60vh;
  overflow-y: auto;
`;

export const Watermark = styled("span")`
  position: absolute;
  top: 185px;
  z-index: 1;
  left: 0;
  font-weight: 900;
  font-size: 80px;
  line-height: 94px;
  text-align: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.palette.grey[100]};
  transform: rotate(45deg);
`;

export const BoxDetails = styled(Box)`
  background: ${(props) => alpha(props.theme.palette.grey[300], 0.1)};
  padding: 20px 25px 20px 55px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 15px 0px;
`;

export const BoxDescription = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
`;
