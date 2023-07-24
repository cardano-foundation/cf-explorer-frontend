import { Box, styled } from "@mui/material";

export const ContainerReffer = styled(Box)`
  background: ${(props) => props.theme.palette.primary[100]};
  text-align: left;
  padding: 30px 55px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 30px 40px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 30px 30px;
  }
`;

export const Content = styled(Box)`
  line-height: normal;
  padding: 30px 60px;
  ${({ theme }) => theme.breakpoints.down("lg")} {
    padding: 30px 40px;
  }
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 10px;
  }
`;

export const TextReffer = styled(Box)`
  font-size: 16px;
  color: ${(props) => props.theme.palette.blue[650]};
  margin: 20px 0px;
`;

export const TitleSection = styled(Box)`
  font-weight: 700;
  font-size: 16px;
`;

export const TextSubHeader = styled(Box)`
  font-size: 24px;
  margin: 30px 0px;
`;

export const TextHeader = styled(Box)`
  font-weight: 700;
  font-size: 36px;
`;

export const TextItalic = styled("span")`
  font-style: italic;
  font-size: 16px;
`;

export const TextBold = styled("span")`
  font-size: 16px;
  font-weight: 700;
`;
