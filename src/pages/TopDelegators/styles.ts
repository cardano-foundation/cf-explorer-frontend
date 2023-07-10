import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)`
  margin-top: 18px;

  .MuiSelect-select.MuiSelect-outlined {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoints.values.sm}px) {
    padding-top: 10px;
    margin-top: 0px !important;
  }
`;
