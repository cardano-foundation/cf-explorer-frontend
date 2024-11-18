import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const StyledDescription = {
  Container: styled(Box)`
    padding: 8px;
  `,
  Title: styled(Box)`
    font-size: 16px;
    font-weight: 700;
    line-height: 18.75px;
    color: ${(props) => props.theme.palette.secondary.main};
  `,
  Value: styled("p")`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    color: ${(props) => props.theme.palette.secondary.light};
    word-break: break-word;
  `
};
