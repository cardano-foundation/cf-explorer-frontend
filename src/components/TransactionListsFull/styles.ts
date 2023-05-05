import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";
import breakpoints from "../../themes/breakpoints";

export const StyledContainer = styled(Box)`
  @media screen and (max-width: ${breakpoints.values.sm}px) {
    .transactions-table > div {
      border: none;
      box-shadow: none;
      background-color: inherit;
    }
    .block-list-table > div table {
    }
    .block-list-table > div tr,
    th {
      background-color: inherit;
    }
  }
`;

export const StyledLink = styled(Link)`
  font-family: var(--font-family-text) !important;
  color: ${props => props.theme.palette.secondary.main} !important;
`;
export const Label = styled(Box)`
  min-width: 50px;
`;
