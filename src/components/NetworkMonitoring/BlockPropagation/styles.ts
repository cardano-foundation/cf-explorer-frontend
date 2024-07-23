import { styled } from "@mui/material";

export const StyledCard = {
  Container: styled("div")`
    height: 100%;
    background: ${(props) => props.theme.palette.secondary[0]};
    border-radius: 12px;
    box-shadow: ${(props) => props.theme.shadow.card};
    padding: 26px 32px;
  `,
  Title: styled("p")`
    font-size: 20px;
    font-weight: 500;
    text-align: start;
    color: ${(props) => props.theme.palette.secondary.main};
  `
};
