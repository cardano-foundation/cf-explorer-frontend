import { Box, Link, styled } from "@mui/material";
import Table from "../../commons/Table";

export const Container = styled(Box)``;

export const Title = styled("h3")`
  font-family: var(--font-family-title);
  margin-top: 0;
`;

export const SmallText = styled("small")``;
export const StyledLink = styled(Link)`
  text-decoration: none;
  font-family: var(--font-family-text);
  color: ${props => props.theme.colorBlue};
  font-weight: 400;
`;

export const StyledTable = styled(Table)`
  thead th {
    font-size: 12px;
  }
  tbody tr {
    height: 55px;
  }
  tbody tr td {
    padding-top: 0;
    padding-bottom: 0;
  }
`;
