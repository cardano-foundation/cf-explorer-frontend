import { Box, styled } from "@mui/material";

export const ContainerReffer = styled(Box)`
  background: ${(props) => props.theme.palette.grey[40]};
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
  font-style: normal;
  font-weight: 700;
  color: ${(props) => props.theme.palette.blue[650]};
  margin: 20px 0px;
`;
